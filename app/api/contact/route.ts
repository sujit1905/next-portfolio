import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(5000),
  _hp: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _hp } = result.data;

    // Honeypot check (server-side)
    if (_hp && _hp.length > 0) {
      // Return 200 to not let bots know they were detected
      return NextResponse.json({ success: true });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'mecwansujit@gmail.com';

    if (!RESEND_API_KEY || RESEND_API_KEY === 're_your_resend_api_key_here') {
      // Dev mode — log to console instead
      console.log('📬 Contact form submission (dev mode — no Resend key set):');
      console.log({ name, email, subject, message });
      return NextResponse.json({ success: true, dev: true });
    }

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0f5; padding: 40px; border-radius: 12px;">
            <div style="background: #d4ff3f; color: #0a0a0f; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; display: inline-block; margin-bottom: 24px;">
              NEW MESSAGE
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #f0f0f5;">${subject}</h1>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #5a5a7a; font-size: 12px; width: 80px;">FROM</td>
                <td style="padding: 8px 0; color: #f0f0f5;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5a5a7a; font-size: 12px;">EMAIL</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d4ff3f;">${email}</a></td>
              </tr>
            </table>
            <div style="background: #0f1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; margin-bottom: 24px; line-height: 1.7; color: #a0a0b5;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
            <p style="font-size: 12px; color: #5a5a7a;">Sent from your portfolio contact form at sujitmecwan.dev</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
