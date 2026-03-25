'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'El Sistema Eléctrico', href: '#oportunidad' },
  { label: 'Capacidades', href: '#servicios' },
  { label: 'Ciclo EPC', href: '#portafolio' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'
        }`}
        style={{ padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Logo */}
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--navy)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, color: 'var(--yellow)', letterSpacing: '-0.02em' }}>BE</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: scrolled ? 'var(--navy)' : 'white', letterSpacing: '0.02em', lineHeight: 1, transition: 'color 0.3s' }}>
              BIonergy
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1, marginTop: 2, transition: 'color 0.3s' }}>
              Sistema Eléctrico Nacional
            </div>
          </div>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', display: 'flex', flexDirection: 'column', gap: 5,
            transition: 'all 0.3s', marginRight: 4,
          }}
          aria-label="Menu"
        >
          {[
            open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            null,
            open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          ].map((transform, i) => (
            i === 1 ? (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: scrolled ? 'var(--navy)' : 'white',
                borderRadius: 2, transition: 'all 0.3s', opacity: open ? 0 : 1,
                filter: scrolled ? 'none' : 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
              }} />
            ) : (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: scrolled ? 'var(--navy)' : 'white',
                borderRadius: 2, transition: 'all 0.3s', transform: transform || 'none',
                filter: scrolled ? 'none' : 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
              }} />
            )
          ))}
        </button>
      </nav>

      {/* Full screen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'var(--navy)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: open ? 'all' : 'none',
      }}>
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: i === 0 ? 'var(--yellow)' : 'white',
              textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'color 0.2s', lineHeight: 1.4,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow)')}
            onMouseLeave={e => (e.currentTarget.style.color = i === 0 ? 'var(--yellow)' : 'white')}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={() => setOpen(false)}
          className="btn-primary"
          style={{ marginTop: 24, padding: '14px 32px', borderRadius: 4 }}
        >
          Contactar ahora
        </a>
      </div>
    </>
  )
}