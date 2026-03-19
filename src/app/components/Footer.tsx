'use client'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px clamp(32px, 5vw, 72px)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 34, height: 34, background: 'var(--yellow)',
              borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, color: 'var(--navy)' }}>BE</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>Bio Energy</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Soluciones Inteligentes</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 220 }}>
            Recursos estratégicos para la industria oil & gas en Colombia y Venezuela.
          </p>
        </div>

        {/* Services */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
            Servicios
          </div>
          {['O&M Integral', 'Generación Eléctrica', 'Bombeo de Fluidos', 'Tratamiento de Crudo', 'Metrología', 'Repuestos'].map((s, i) => (
            <a key={i} href="#servicios" style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
              {s}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 16 }}>
            Contacto
          </div>
          {['+57 316 832 0944', '+57 320 305 4118', 'info@bioenergy.com.co', 'Colombia · Venezuela'].map((c, i) => (
            <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, lineHeight: 1.6 }}>{c}</div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
          © 2025 Bio Energy Soluciones Inteligentes. Todos los derechos reservados.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
            Expansión activa en Venezuela
          </span>
        </div>
      </div>
    </footer>
  )
}