'use client'

import { useEffect, useRef, useState } from 'react'
import { Layers, HardHat, Zap, Wrench } from 'lucide-react'

const phases = [
  {
    icon: Layers,
    phase: 'Ingeniería',
    code: '01',
    title: 'Diseños de Alta Complejidad',
    desc: 'Ingeniería conceptual y de detalle para proyectos de generación, transmisión y distribución eléctrica. Capital intelectual propio sin dependencia de terceros.',
    items: ['Estudios de flujo de carga', 'Ingeniería básica y de detalle', 'Diseño de subestaciones AT/MT', 'Modelos de simulación y SCADA'],
    color: '#3b82f6',
  },
  {
    icon: HardHat,
    phase: 'Construcción',
    code: '02',
    title: 'Obra Civil y Electromecánica',
    desc: 'Montajes de gran escala. Obra civil, estructuras metalmecánicas propias, instalación de equipos de potencia y tendido de líneas de transmisión.',
    items: ['Fabricación de torres AT en sitio', 'Montaje de transformadores de potencia', 'Tendido de conductores ACSR/OPGW', 'Construcción de pórticos y patios AT'],
    color: '#f59e0b',
  },
  {
    icon: Zap,
    phase: 'Puesta en Marcha',
    code: '03',
    title: 'Comisionamiento Internacional',
    desc: 'Pruebas de aceptación, energización controlada y comisionamiento técnico bajo estándares IEC e IEEE. Entregamos sistemas operativos, no obras inconclusas.',
    items: ['Pruebas de relés y protecciones', 'Energización y pruebas de vacío', 'Verificación de automatismos', 'Certificación bajo normas internacionales'],
    color: '#22c55e',
  },
  {
    icon: Wrench,
    phase: 'O&M',
    code: '04',
    title: 'Mantenimiento de Largo Aliento',
    desc: 'Planes preventivos y correctivos que garantizan la disponibilidad operativa del sistema. BIonergy no abandona el proyecto después de la entrega.',
    items: ['Mantenimiento predictivo con termografía', 'Planes anuales preventivos y correctivos', 'Capacitación de personal local', 'Respuesta de emergencia 24/7'],
    color: '#f472b6',
  },
]

// ── 9 logos distribuidos en 3 grupos de 3 ────────────────────────────────────
// Cada grupo se muestra en la sección del carrusel correspondiente
// Aquí los mostramos todos como vitrina del consorcio
const logos = [
  { src: '/images/electricidad/iticcol.png',     name: 'Iticcol',       bg: '#fff' },
  { src: '/images/electricidad/M&AC.png',         name: 'M&AC',          bg: '#f0f4f8' },
  { src: '/images/electricidad/incelcime.png',    name: 'Inelcime SAS',  bg: '#f0f4f8' },
  { src: '/images/electricidad/procme.png',       name: 'Procme',        bg: '#f5c800' },
  { src: '/images/electricidad/skidexperts.png',  name: 'Skid Experts',  bg: '#c8d400' },
  { src: '/images/electricidad/porta.png',        name: 'Porta',         bg: '#111' },
  { src: '/images/electricidad/globalem.png',     name: 'Globalem',      bg: '#fff' },
  { src: '/images/electricidad/copower.png',      name: 'Copower',       bg: '#fff' },
  { src: '/images/electricidad/cme.png',          name: 'CME Procme',    bg: '#fff' },
]

export default function LifecycleSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const ph = phases[active]
  const PhIcon = ph.icon

  return (
    <>
      <style>{`
        #lifecycle-phases {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          margin-bottom: 24px;
        }
        #lifecycle-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 48px);
          background: rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: clamp(20px, 4vw, 48px);
        }
        @media (max-width: 900px) {
          #lifecycle-phases {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          #lifecycle-detail {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 540px) {
          #lifecycle-phases {
            grid-template-columns: 1fr 1fr !important;
            gap: 6px !important;
          }
          #lifecycle-detail { padding: 18px !important; }
          #lifecycle-header h2 { font-size: clamp(26px, 7vw, 44px) !important; }
        }

        /* ── Logos grid ── */
        #logos-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 10px;
          margin-top: 40px;
        }
        @media (max-width: 900px) {
          #logos-grid { grid-template-columns: repeat(5, 1fr) !important; }
        }
        @media (max-width: 540px) {
          #logos-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
        }

        .logo-card {
          border-radius: 8px;
          padding: 12px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.25s ease;
          overflow: hidden;
          aspect-ratio: 3/2;
        }
        .logo-card:hover {
          border-color: rgba(245,200,66,0.25);
          transform: translateY(-2px);
        }
        .logo-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: none;
          transition: filter 0.25s;
        }

        @keyframes fadeUpLC {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lifecycle-detail-anim { animation: fadeUpLC 0.4s ease forwards; }
      `}</style>

      <section
        id="portafolio"
        ref={sectionRef}
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--navy)',
          padding: 'clamp(48px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        }}
      >
        {/* ── Header ── */}
        <div
          id="lifecycle-header"
          style={{
            maxWidth: 900, margin: '0 auto',
            marginBottom: 'clamp(32px, 6vw, 72px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontSize: '0.65rem' }}>
            BIonergy · Consorcio Integral
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(26px, 5vw, 64px)',
              fontWeight: 800, color: 'white',
              lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 20, wordBreak: 'break-word',
            }}
          >
            De la ingeniería al mantenimiento.
            <br />
            <span style={{ color: 'var(--yellow)' }}>Sin intermediarios.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 620,
          }}>
            No solo somos constructores; somos operadores. BIonergy asume la responsabilidad del ciclo de vida completo, garantizando que cada bolívar invertido se traduzca en estabilidad eléctrica real.
          </p>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            maxWidth: 1100, margin: '0 auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {/* Phase selector */}
          <div id="lifecycle-phases">
            {phases.map((p, i) => {
              const PIcon = p.icon
              const isActive = i === active
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? p.color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 8,
                    padding: 'clamp(12px, 2vw, 20px)',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.3s', width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 6, flexShrink: 0,
                      background: isActive ? p.color : 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}>
                      <PIcon size={14} color={isActive ? 'white' : 'rgba(255,255,255,0.3)'} />
                    </div>
                    <span style={{ fontSize: 8, fontWeight: 700, color: isActive ? p.color : 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Fase {p.code}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(11px, 1.2vw, 14px)',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'color 0.3s', lineHeight: 1.3,
                  }}>
                    {p.phase}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active phase detail */}
          <div
            key={active}
            id="lifecycle-detail"
            className="lifecycle-detail-anim"
            style={{ border: `1px solid ${ph.color}33` }}
          >
            {/* Left: description */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                  background: ph.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <PhIcon size={22} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: ph.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Fase {ph.code} · {ph.phase}
                  </div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(15px, 2vw, 22px)', color: 'white', lineHeight: 1.2 }}>
                    {ph.title}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 'clamp(12px, 1.3vw, 15px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
                {ph.desc}
              </p>
            </div>

            {/* Right: capabilities */}
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Capacidades específicas
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ph.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: ph.color, marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 'clamp(11px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quote actualizado + logos ── */}
          <div style={{
            marginTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 40,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}>

            {/* Quote row: icono + texto */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 20,
              maxWidth: 820, margin: '0 auto',
              flexWrap: 'wrap',
            }}>
              {/* Icono consorcio */}
              <div style={{
                flexShrink: 0,
                width: 56, height: 56,
                borderRadius: 12,
                background: 'rgba(245,200,66,0.08)',
                border: '1px solid rgba(245,200,66,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Network / consorcio icon SVG */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--yellow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5"  r="2"/>
                  <circle cx="5"  cy="19" r="2"/>
                  <circle cx="19" cy="19" r="2"/>
                  <line x1="12" y1="7"  x2="5"  y2="17"/>
                  <line x1="12" y1="7"  x2="19" y2="17"/>
                  <line x1="5"  y1="19" x2="19" y2="19"/>
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 220 }}>
                {/* Stat */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    color: 'var(--yellow)', lineHeight: 1,
                  }}>
                    +10
                  </span>
                  <span style={{ fontSize: 'clamp(11px, 1.3vw, 14px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                    compañías<br />aliadas
                  </span>
                </div>

                {/* Texto actualizado */}
                <p style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 600,
                  fontSize: 'clamp(13px, 1.8vw, 18px)',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                }}>
                  Representamos a más de 10 compañías, permitiéndonos dar soluciones inteligentes y eficientes a las diferentes demandas de los sistemas eléctricos desde la planificación hasta el mantenimiento.
                </p>
                <div style={{ width: 40, height: 2, background: 'var(--yellow)', marginTop: 16 }} />
              </div>
            </div>

            {/* ── Logos grid ── */}
            <div style={{ marginTop: 32 }}>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                textAlign: 'center', marginBottom: 16,
              }}>
                Empresas del consorcio
              </div>

              <div id="logos-grid">
                {logos.map((logo, i) => (
                  <div
                    key={i}
                    className="logo-card"
                    style={{ background: logo.bg }}
                    title={logo.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}