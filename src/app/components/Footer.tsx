'use client'

export default function Footer() {
  return (
    <>
      <style>{`
        #footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          #footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          #footer-brand {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 480px) {
          #footer-grid { grid-template-columns: 1fr !important; }
          #footer-brand { grid-column: 1 !important; }
        }
      `}</style>

      <footer style={{
        background: '#060e1c',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 72px)',
      }}>
        <div id="footer-grid">

          {/* Brand */}
          <div id="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 34, height: 34, background: 'var(--yellow)',
                borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, color: 'var(--navy)' }}>BE</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>BIonergy</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Sistema Eléctrico Nacional</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 220 }}>
              Consorcio integral para la recuperación y modernización del Sistema Eléctrico Nacional de Venezuela.
            </p>
          </div>

          {/* Capacidades */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
              Capacidades
            </div>
            {['Generación Hidráulica', 'Generación Fotovoltaica', 'Respaldo Térmico', 'Transmisión AT/MT/BT', 'Subestaciones Eléctricas', 'Alumbrado Inteligente', 'Operación y Mantenimiento'].map((s, i) => (
              <a
                key={i}
                href="#servicios"
                style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s', lineHeight: 1.4 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {s}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
              Contacto
            </div>
            {[
              { text: '+57 316 832 0944', href: 'tel:+573168320944' },
              { text: '+57 320 305 4118', href: 'tel:+573203054118' },
              { text: '+57 310 200 5892', href: 'tel:+573102005892' },
              { text: 'info@bioenergy.com.co', href: 'mailto:info@bioenergy.com.co' },
              { text: 'Colombia · Venezuela', href: null },
            ].map((c, i) => (
              c.href ? (
                <a key={i} href={c.href}
                  style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, textDecoration: 'none', lineHeight: 1.6, wordBreak: 'break-all', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >{c.text}</a>
              ) : (
                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, lineHeight: 1.6 }}>{c.text}</div>
              )
            ))}
          </div>

        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
            © 2025 BIonergy. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
              Expansión activa en Venezuela · 2025
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}