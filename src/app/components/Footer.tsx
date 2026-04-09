'use client'

export default function Footer() {
  return (
    <>
      <style>{`
        #footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 1024px) {
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

        .footer-contact-block {
          padding: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .footer-contact-block:last-child { margin-bottom: 0; }

        .footer-contact-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: var(--yellow);
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .footer-contact-line {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          word-break: break-word;
        }
        .footer-contact-line a {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-line a:hover { color: var(--yellow); }

        .footer-flag {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 3px;
          margin-bottom: 8px;
        }
        .footer-flag-co {
          background: rgba(245,200,66,0.1);
          border: 1px solid rgba(245,200,66,0.25);
          color: var(--yellow);
        }
        .footer-flag-ve {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #22c55e;
        }
      `}</style>

      <footer style={{
        background: '#060e1c',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 72px)',
      }}>
        <div id="footer-grid">

          {/* ── Brand ── */}
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

          {/* ── Capacidades ── */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
              Capacidades
            </div>
            {[
              'Generación Hidráulica',
              'Generación Fotovoltaica',
              'Respaldo Térmico',
              'Transmisión AT/MT/BT',
              'Subestaciones Eléctricas',
              'Alumbrado Inteligente',
              'Operación y Mantenimiento',
            ].map((s, i) => (
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

          {/* ── Contacto Colombia ── */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
              Contacto
            </div>

            {/* Alexander Guzmán — Colombia */}
            <div className="footer-contact-block">
              <div className="footer-flag footer-flag-co">🇨🇴 Colombia</div>
              <div className="footer-contact-name">Alexander Guzmán</div>
              <div className="footer-contact-line">
                <a href="tel:+573183611409">Tel: +57 318 361 1409</a>
              </div>
              <div className="footer-contact-line" style={{ marginTop: 4 }}>
                Calle 11a #1E-125 Ofc. 501-502<br />
                Centro de Negocios Holiday Inn<br />
                Barrio Quinta Vélez · Cúcuta
              </div>
            </div>

            {/* Juan Pablo Rodríguez — Venezuela */}
            <div className="footer-contact-block">
              <div className="footer-flag footer-flag-ve">🇻🇪 Venezuela</div>
              <div className="footer-contact-name">Juan Pablo Rodríguez</div>
              <div className="footer-contact-line">
                <a href="tel:+5804243557169">Tel: +58 424 355 7169</a>
              </div>
              <div className="footer-contact-line" style={{ marginTop: 4 }}>
                Zona Industrial Campo Alegre<br />
                C/ Campo Alegre entre Av. Río Pao y Uribante<br />
                Galpón G-4 · Cagua, Edo. Aragua
              </div>
            </div>

            {/* Email general */}
            <div style={{ marginTop: 8 }}>
              <a
                href="mailto:info@bioenergy.com.co"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-all', lineHeight: 1.6, display: 'block' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                info@bioenergy.com.co
              </a>
            </div>
          </div>

          {/* ── Teléfonos adicionales ── */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
              Líneas directas
            </div>
            {[
              { text: '+57 316 832 0944', href: 'tel:+573168320944' },
              { text: '+57 320 305 4118', href: 'tel:+573203054118' },
              { text: '+57 310 200 5892', href: 'tel:+573102005892' },
            ].map((c, i) => (
              <a key={i} href={c.href}
                style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, textDecoration: 'none', lineHeight: 1.6, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {c.text}
              </a>
            ))}

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>
                Presencia
              </div>
              {['Colombia — sede principal', 'Venezuela — expansión activa'].map((loc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: i === 0 ? 'var(--yellow)' : '#22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{loc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
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