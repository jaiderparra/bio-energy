'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Sun, Droplets, Radio, Lightbulb, Wrench, HardHat, Settings } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

// ─── Imagen por servicio, alineada al contenido ───────────────────────────────
// 01 Generación Hidráulica        → hero11  (generadores MWG-1000 en campo)
// 02 Generación Fotovoltaica      → hero3   (campo solar panorámico)
// 03 Respaldo Térmico Gas/Diésel  → hero9   (planta industrial exterior)
// 04 Torres y Pórticos AT         → hero1   (subestación exterior AT)
// 05 Tendido de Líneas AT/MT/BT   → hero2   (técnico bucket truck AT)
// 06 Subestaciones Eléctricas     → hero5   (transformador ABB potencia)
// 07 Alumbrado Público Inteligente → hero14 (instalación solar techo ABB)
// 08 Operación y Mantenimiento    → hero12  (técnicos instrumentos O&M)
const services = [
  {
    icon: Droplets,
    n: '01',
    title: 'Generación Hidráulica',
    desc: 'Pequeñas y medianas centrales hidroeléctricas para aliviar la dependencia del Bajo Caroní y diversificar la matriz de generación nacional.',
    tag: 'Generación',
    img: '/images/electricidad/hero11.png',
  },
  {
    icon: Sun,
    n: '02',
    title: 'Generación Fotovoltaica',
    desc: 'Soluciones solares de rápido despliegue para el occidente del país (Zulia/Falcón), aprovechando la alta radiación solar disponible.',
    tag: 'Generación',
    img: '/images/electricidad/hero3.png',
  },
  {
    icon: Settings,
    n: '03',
    title: 'Respaldo Térmico Gas/Diésel',
    desc: 'Mantenimiento y operación de plantas térmicas existentes. Garantizamos el baseload ante contingencias críticas del sistema.',
    tag: 'Generación',
    img: '/images/electricidad/hero9.png',
  },
  {
    icon: Radio,
    n: '04',
    title: 'Torres y Pórticos AT',
    desc: 'Metalmecánica propia: diseño y fabricación de torres de alta tensión y pórticos para subestaciones. Reducción de costos de importación y tiempos.',
    tag: 'Transmisión',
    img: '/images/electricidad/hero1.png',
  },
  {
    icon: Zap,
    n: '05',
    title: 'Tendido de Líneas AT/MT/BT',
    desc: 'Capacidad instalada para montaje de alta tensión, tendido de líneas y construcción de redes de media, baja y alta tensión.',
    tag: 'Transmisión',
    img: '/images/electricidad/hero2.jpg',
  },
  {
    icon: HardHat,
    n: '06',
    title: 'Subestaciones Eléctricas',
    desc: 'Construcción y modernización de nodos críticos de transmisión. Diseño, montaje y comisionamiento de subestaciones de alta complejidad.',
    tag: 'Transmisión',
    img: '/images/electricidad/hero5.jpg',
  },
  {
    icon: Lightbulb,
    n: '07',
    title: 'Alumbrado Público Inteligente',
    desc: 'Modernización de vías expresas con tecnología fotovoltaica. Desconexión del alumbrado de la red principal para liberar MW hacia zonas residenciales.',
    tag: 'Eficiencia',
    img: '/images/electricidad/hero14.png',
  },
  {
    icon: Wrench,
    n: '08',
    title: 'Operación y Mantenimiento',
    desc: 'Planes preventivos y correctivos que garantizan la disponibilidad operativa del sistema. BIonergy no abandona el proyecto después de la entrega.',
    tag: 'O&M',
    img: '/images/electricidad/hero12.png',
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastService = useRef(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setProgress(p)
      const svc = Math.min(services.length - 1, Math.floor(p * services.length))
      if (svc !== lastService.current) { lastService.current = svc; setActiveService(svc) }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const svc = services[activeService]
  const Icon = svc.icon
  const pct = Math.round(progress * 100)

  const tagColor: Record<string, string> = {
    'Generación':  '#22c55e',
    'Transmisión': '#f59e0b',
    'Eficiencia':  '#60a5fa',
    'O&M':         '#f472b6',
  }

  return (
    <>
      <style>{`
        #svc-sticky {
          position: sticky; top: 0; width: 100%;
          height: 100vh; height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border-top: 1px solid var(--border);
          background: var(--white);
        }
        @media (max-width: 768px) {
          #svc-sticky {
            grid-template-columns: 1fr !important;
            grid-template-rows: 55% 45% !important;
          }
          #svc-text {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding: 68px 20px 14px !important;
          }
          #svc-image { height: 100% !important; }
        }
        @keyframes fadeUpSvc {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .svc-img-slide {
          position: absolute; inset: 0;
          transition: opacity 0.5s ease;
        }
      `}</style>

      {/* 1 viewport por servicio → 8 × 100vh */}
      <section id="servicios" ref={containerRef} style={{ height: `${services.length * 100}vh`, position: 'relative' }}>
        <div id="svc-sticky">

          {/* ── TEXT ── */}
          <div id="svc-text" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 64px)',
            paddingTop: 'clamp(80px, 10vh, 100px)',
            borderRight: '1px solid var(--border)',
            position: 'relative', overflow: 'hidden', minWidth: 0,
          }}>
            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${((activeService + 1) / services.length) * 100}%`, background: 'var(--navy)', transition: 'width 0.4s ease' }} />
            </div>

            {/* Label + tag badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
              <span className="label" style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)' }}>
                Capacidades · {svc.n} / 0{services.length}
              </span>
              <span style={{
                fontSize: 7, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: 20,
                background: `${tagColor[svc.tag]}22`,
                color: tagColor[svc.tag],
                border: `1px solid ${tagColor[svc.tag]}44`,
              }}>
                {svc.tag}
              </span>
            </div>

            {/* Icon + number */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(10px, 2vh, 18px)' }}>
              <div style={{
                width: 'clamp(32px, 4vw, 44px)', height: 'clamp(32px, 4vw, 44px)',
                borderRadius: 8, background: 'var(--navy)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color="var(--yellow)" />
              </div>
              <span style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 70px)',
                color: 'var(--gray-100)', lineHeight: 1,
              }}>
                {svc.n}
              </span>
            </div>

            {/* Title */}
            <h2
              key={`t-${activeService}`}
              className="font-display"
              style={{
                fontSize: 'clamp(20px, 3.2vw, 46px)', fontWeight: 800, lineHeight: 1.08,
                color: 'var(--navy)', letterSpacing: '-0.02em',
                marginBottom: 'clamp(6px, 1.5vh, 14px)', wordBreak: 'break-word',
                animation: 'fadeUpSvc 0.35s ease forwards',
              }}
            >
              {svc.title}
            </h2>

            {/* Description */}
            <p
              key={`d-${activeService}`}
              style={{
                fontSize: 'clamp(11px, 1.3vw, 15px)', lineHeight: 1.7, color: 'var(--text-muted)',
                marginBottom: 'clamp(10px, 2vh, 20px)',
                animation: 'fadeUpSvc 0.35s ease 0.06s forwards',
              }}
            >
              {svc.desc}
            </p>

            {/* Service pills — all 8 services, active highlighted */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {services.map((s, i) => {
                const SIcon = s.icon
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 8px', borderRadius: 4,
                    background: i === activeService ? 'var(--navy)' : 'var(--gray-100)',
                    transition: 'all 0.3s',
                  }}>
                    <SIcon size={8} color={i === activeService ? 'var(--yellow)' : 'var(--text-muted)'} />
                    <span style={{
                      fontSize: 7, fontWeight: 600, letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: i === activeService ? 'white' : 'var(--text-muted)',
                    }}>
                      {s.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── IMAGE ── */}
          <div id="svc-image" style={{ position: 'relative', background: '#0a1628', overflow: 'hidden' }}>
            {services.map((s, i) => (
              <div key={i} className="svc-img-slide" style={{ opacity: i === activeService ? 1 : 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,22,40,0.15), rgba(10,22,40,0.6))' }} />
              </div>
            ))}

            {/* Tag badge overlay */}
            <div style={{
              position: 'absolute', top: 24, right: 24, zIndex: 2,
              padding: '4px 10px', borderRadius: 20,
              background: `${tagColor[svc.tag]}22`,
              border: `1px solid ${tagColor[svc.tag]}55`,
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: tagColor[svc.tag],
              }}>
                {svc.tag}
              </span>
            </div>

            {/* Bottom bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(to top, rgba(10,22,40,0.9), transparent)' }}>
              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
              <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginTop: 6, display: 'block' }}>
                BIonergy · {svc.title}
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}