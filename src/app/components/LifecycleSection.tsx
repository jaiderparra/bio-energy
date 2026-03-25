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

export default function LifecycleSection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { /* trigger seen */ } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const ph = phases[active]
  const PhIcon = ph.icon

  return (
    <section
      id="portafolio"
      ref={sectionRef}
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--navy)',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
        <div className="label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontSize: '0.65rem' }}>
          BIonergy · Consorcio Integral
        </div>
        <h2 className="font-display" style={{
          fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 800,
          color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em',
          marginBottom: 20,
        }}>
          De la ingeniería al mantenimiento.
          <br />
          <span style={{ color: 'var(--yellow)' }}>Sin intermediarios.</span>
        </h2>
        <p style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 620 }}>
          No solo somos constructores; somos operadores. BIonergy asume la responsabilidad del ciclo de vida completo, garantizando que cada bolívar invertido se traduzca en estabilidad eléctrica real.
        </p>
      </div>

      {/* Phase selector */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 32 }}>
          {phases.map((p, i) => {
            const PIcon = p.icon
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: i === active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: `1px solid ${i === active ? p.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  padding: 'clamp(12px, 2vw, 20px)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 6,
                    background: i === active ? p.color : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}>
                    <PIcon size={14} color={i === active ? 'white' : 'rgba(255,255,255,0.3)'} />
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, color: i === active ? p.color : 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Fase {p.code}
                  </span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(11px, 1.2vw, 14px)', color: i === active ? 'white' : 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}>
                  {p.phase}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active phase detail */}
        <div
          key={active}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 48px)',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${ph.color}33`,
            borderRadius: 12,
            padding: 'clamp(24px, 4vw, 48px)',
            animation: 'fadeUpSvc 0.4s ease forwards',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: ph.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhIcon size={22} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 8, fontWeight: 700, color: ph.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Fase {ph.code} · {ph.phase}
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(16px, 2vw, 22px)', color: 'white' }}>
                  {ph.title}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 'clamp(12px, 1.3vw, 15px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              {ph.desc}
            </p>
          </div>

          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
              Capacidades específicas
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ph.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ph.color, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(11px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
          <p style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(14px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            maxWidth: 700,
            margin: '0 auto',
            fontStyle: 'italic',
          }}>
            "No solo somos constructores; somos operadores. BIonergy asume la responsabilidad del ciclo de vida completo: Diseño, Construcción, Puesta en Marcha y Mantenimiento Post-Venta."
          </p>
          <div style={{ width: 40, height: 2, background: 'var(--yellow)', margin: '20px auto 0' }} />
        </div>
      </div>
    </section>
  )
}