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
    <section
      id="contacto"
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(64px, 8vw, 100px) clamp(24px, 5vw, 72px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'start',
          marginBottom: 64,
        }}>

          {/* Left: headline */}
          <div>
            <div className="label" style={{ color: 'var(--yellow)', marginBottom: 20 }}>
              Contacto
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800, lineHeight: 1.0,
              color: 'white', letterSpacing: '-0.02em',
              marginBottom: 24,
            }}>
              Hablemos<br />
              <span style={{ color: 'var(--yellow)' }}>de negocios.</span>
            </h2>
            <p style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 380,
            }}>
              ¿Listo para posicionarse en Venezuela? Nuestro equipo está disponible
              para diseñar una propuesta a la medida de sus necesidades operativas.
            </p>

            {/* Response promise */}
            <div style={{
              marginTop: 32,
              padding: '16px 20px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '20px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(245,200,66,0.05)'
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,200,66,0.2)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(245,200,66,0.08)',
                    border: '1px solid rgba(245,200,66,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} color="var(--yellow)" />
                  </div>

                  {/* Info */}
                  <div>
                    <div style={{
                      fontSize: 10, fontWeight: 600,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)', marginBottom: 6,
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
                            fontSize: 14, color: 'rgba(255,255,255,0.75)',
                            textDecoration: 'none', lineHeight: 1.8,
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                        >
                          {line.text}
                          <ArrowUpRight size={11} style={{ opacity: 0.5 }} />
                        </a>
                      ) : (
                        <div key={j} style={{
                          fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
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

        {/* Bottom divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 16, paddingTop: 32,
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
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
  )
}