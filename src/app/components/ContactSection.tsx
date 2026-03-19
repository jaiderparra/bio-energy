'use client'

import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Teléfonos',
    lines: [
      { text: '+57 316 832 0944', href: 'tel:+573168320944' },
      { text: '+57 320 305 4118', href: 'tel:+573203054118' },
      { text: '+57 310 200 5892', href: 'tel:+573102005892' },
    ],
  },
  {
    icon: Mail,
    label: 'Email',
    lines: [
      { text: 'info@bioenergy.com.co', href: 'mailto:info@bioenergy.com.co' },
    ],
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    lines: [
      { text: 'Colombia — sede principal', href: null },
      { text: 'Venezuela — expansión activa', href: null },
    ],
  },
]

export default function ContactSection() {
  return (
    <>
      <style>{`
        #contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: start;
          margin-bottom: 48px;
        }
        @media (max-width: 768px) {
          #contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          #contact-headline {
            font-size: clamp(36px, 10vw, 56px) !important;
          }
        }
      `}</style>

      <section
        id="contacto"
        style={{
          background: 'var(--navy)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: 'clamp(48px, 8vw, 100px) clamp(20px, 5vw, 72px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div id="contact-grid">

            {/* Left: headline */}
            <div>
              <div className="label" style={{ color: 'var(--yellow)', marginBottom: 16 }}>
                Contacto
              </div>
              <h2
                id="contact-headline"
                className="font-display"
                style={{
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  fontWeight: 800, lineHeight: 1.0,
                  color: 'white', letterSpacing: '-0.02em',
                  marginBottom: 20, wordBreak: 'break-word',
                }}
              >
                Hablemos<br />
                <span style={{ color: 'var(--yellow)' }}>de negocios.</span>
              </h2>
              <p style={{
                fontSize: 'clamp(13px, 1.5vw, 15px)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 380,
              }}>
                ¿Listo para posicionarse en Venezuela? Nuestro equipo está disponible
                para diseñar una propuesta a la medida de sus necesidades operativas.
              </p>

              {/* Response badge */}
              <div style={{
                marginTop: 24,
                padding: '12px 16px',
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  Respondemos en menos de <span style={{ color: 'white', fontWeight: 600 }}>24 horas hábiles</span>
                </span>
              </div>
            </div>

            {/* Right: contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: '18px 20px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.background = 'rgba(245,200,66,0.05)'
                      el.style.borderColor = 'rgba(245,200,66,0.2)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.background = 'rgba(255,255,255,0.03)'
                      el.style.borderColor = 'rgba(255,255,255,0.07)'
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(245,200,66,0.08)',
                      border: '1px solid rgba(245,200,66,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={15} color="var(--yellow)" />
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{
                        fontSize: 10, fontWeight: 600,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)', marginBottom: 5,
                      }}>
                        {item.label}
                      </div>
                      {item.lines.map((line, j) => (
                        line.href ? (
                          <a
                            key={j}
                            href={line.href}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 4,
                              fontSize: 'clamp(12px, 1.5vw, 14px)',
                              color: 'rgba(255,255,255,0.75)',
                              textDecoration: 'none', lineHeight: 1.8,
                              transition: 'color 0.2s',
                              wordBreak: 'break-all',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                          >
                            {line.text}
                            <ArrowUpRight size={10} style={{ opacity: 0.5, flexShrink: 0 }} />
                          </a>
                        ) : (
                          <div key={j} style={{
                            fontSize: 'clamp(12px, 1.5vw, 14px)',
                            color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
                          }}>
                            {line.text}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
              © 2025 Bio Energy Soluciones Inteligentes · Colombia · Venezuela
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                Expansión activa en Venezuela · 2025
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}