'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/metadata';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for glass blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0"
        style={{ zIndex: 'var(--z-navbar)' as unknown as number }}
      >
        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-4 mt-4 rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-[rgba(10,10,15,0.88)] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-transparent'
          }`}
        >
          {/* Brand Name (SM box removed) */}
          <Link
            href="/"
            aria-label="Sujit Mecwan — Home"
            className="group flex items-center gap-1.5"
          >
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-accent transition-colors duration-200">
              Sujit<span className="text-accent ml-1.5 font-extrabold">Mecwan</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: 'rgba(212, 255, 63, 0.08)', border: '1px solid rgba(212, 255, 63, 0.2)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary-gradient hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Hire Me
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl border border-white/10 hover:border-accent/30 transition-colors"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-text-primary block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-px bg-text-primary block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-text-primary block"
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md md:hidden"
              style={{ zIndex: 55 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0d0d14] border-l border-white/[0.08] flex flex-col p-6 md:hidden"
              style={{ zIndex: 56 }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-lg text-white">
                  Sujit<span className="text-accent font-extrabold">Mecwan</span>
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors text-lg"
                >
                  ×
                </button>
              </div>

              {/* Nav links */}
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1.5" role="list">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            active
                              ? 'bg-accent/10 text-accent border border-accent/20'
                              : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                          }`}
                        >
                          {link.label}
                          {active && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom CTA */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="btn-primary-gradient flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider"
                >
                  Let&apos;s Work Together
                </Link>
                <p className="text-center text-xs text-text-muted mt-3 font-mono">
                  {siteConfig.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
