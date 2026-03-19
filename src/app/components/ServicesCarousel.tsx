'use client'

import { useState, useRef, useEffect } from 'react'
import { Settings, Zap, Droplets, FlaskConical, TestTube, Wrench, Ruler, HardHat, Package, ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Settings,
    title: 'O&M Integral',
    label: 'Operación y Mantenimiento',
    headline: 'Control total de la operación en campo.',
    desc: 'Supervisión continua, fiscalización, optimización de procesos y aseguramiento de información operativa. Reducimos diferidas y maximizamos la producción.',
    features: ['Supervisión 24/7', 'Fiscalización de fluidos', 'Optimización de procesos', 'Reportes operativos'],
  },
  {
    icon: Zap,
    title: 'Generación Eléctrica',
    label: 'Power Generation',
    headline: 'Energía donde no hay red eléctrica.',
    desc: 'Suministro, instalación y mantenimiento de grupos electrógenos y turbogeneradores para campos remotos. Soluciones desde 20 kVA hasta 5 MW.',
    features: ['Grupos electrógenos diesel', 'Turbogeneradores gas', 'Tableros ATS', 'Mantenimiento preventivo'],
  },
  {
    icon: Droplets,
    title: 'Bombeo de Fluidos',
    label: 'Fluid Pumping',
    headline: 'Cada fluido en su lugar, a tiempo.',
    desc: 'Diseño, suministro e implementación de sistemas de bombeo centrífugo, sumergible y reciprocante para crudo, agua e inyección.',
    features: ['Bombas API 610', 'Sistemas ESP', 'Inyección de agua', 'Manifolds y válvulas'],
  },
  {
    icon: FlaskConical,
    title: 'Tratamiento de Fluidos',
    label: 'Fluid Treatment',
    headline: 'Plantas modulares listas para operar.',
    desc: 'Diseño y construcción de plantas PTAP, PTAR y separadores trifásicos modulares. Sistemas de separación y calidad de agua de inyección.',
    features: ['Separadores trifásicos', 'PTAP y PTAR', 'Deshidratadores', 'Control de calidad'],
  },
  {
    icon: TestTube,
    title: 'Prueba de Pozos',
    label: 'Well Testing',
    headline: 'Medición precisa desde el primer día.',
    desc: 'Soluciones integrales para prueba de pozos en superficie: separadores, quemadores, medición de fluidos y supervisión especializada en sitio.',
    features: ['Separadores de prueba', 'Quemadores certificados', 'Medición fiscal', 'Supervisión in-situ'],
  },
  {
    icon: Wrench,
    title: 'Mantenimiento',
    label: 'Asset Maintenance',
    headline: 'Equipos en su punto óptimo siempre.',
    desc: 'Diagnóstico, reparación y montaje de equipos rotativos bajo especificaciones de fabricante. Motores, compresores, bombas, alternadores y transmisiones.',
    features: ['Equipos rotativos', 'Diagnóstico vibración', 'Reparación in-situ', 'Gestión de repuestos'],
  },
  {
    icon: Ruler,
    title: 'Metrología',
    label: 'Metrology & Measurement',
    headline: 'Cada barril medido con precisión.',
    desc: 'Calibraciones ONAC, fiscalización de fluidos, transferencia en custodia y auditoría de medición de hidrocarburos. Cumplimiento regulatorio garantizado.',
    features: ['Calibraciones ONAC', 'Transferencia custodia', 'Auditoría fiscal', 'Capacitación técnica'],
  },
  {
    icon: HardHat,
    title: 'Construcción EPC',
    label: 'Engineering & Construction',
    headline: 'De los planos a la operación.',
    desc: 'Diseño, fabricación y ejecución de proyectos EPC: líneas de flujo, oleoductos, tanques API 650, campamentos y facilidades de producción completas.',
    features: ['Líneas de flujo', 'Tanques API 650', 'Oleoductos', 'Facilidades completas'],
  },
  {
    icon: Package,
    title: 'Repuestos e Insumos',
    label: 'Parts & Supplies',
    headline: 'Stock permanente, entrega inmediata.',
    desc: 'Suministro de repuestos originales y alternativos para la industria oil & gas. Sellos, rodamientos, válvulas, químicos e insumos con despacho express.',
    features: ['Sellos mecánicos', 'Rodamientos SKF/FAG', 'Válvulas y fittings', 'Químicos para tratamiento'],
  },
]

export default function ServicesCarousel() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (index: number) => {
    if (animating || index === active) return
    setAnimating(true)
    setActive(index)
    setTimeout(() => setAnimating(false), 400)
  }

  const prev = () => goTo(Math.max(0, active - 1))
  const next = () => goTo(Math.min(services.length - 1, active + 1))

  // Scroll active card into view
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.svc-card')
    const card = cards[active] as HTMLElement
    if (!card) return
    const trackWidth = track.offsetWidth
    const cardLeft = card.offsetLeft
    const cardWidth = card.offsetWidth
    track.scrollTo({
      left: cardLeft - trackWidth / 2 + cardWidth / 2,
      behavior: 'smooth',
    })
  }, [active])

  const svc = services[active]
  const Icon = svc.icon

  return (
    <section
      id="portafolio"
      style={{
        background: 'var(--navy)',
        padding: 'clamp(64px, 8vw, 100px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(24px, 5vw, 72px)', marginBottom: 48 }}>
        <div className="label" style={{ color: 'var(--yellow)', marginBottom: 16 }}>
          Portafolio de Servicios
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="font-display" style={{
            fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800,
            color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            9 líneas de servicio<br />
            <span style={{ color: 'var(--yellow)' }}>para Venezuela.</span>
          </h2>
          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={prev}
              disabled={active === 0}
              style={{
                width: 40, height: 40,
                borderRadius: 6,
                background: active === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: active === 0 ? 'rgba(255,255,255,0.2)' : 'white',
                cursor: active === 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={active === services.length - 1}
              style={{
                width: 40, height: 40,
                borderRadius: 6,
                background: active === services.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: active === services.length - 1 ? 'rgba(255,255,255,0.2)' : 'white',
                cursor: active === services.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

        {/* LEFT: Cards carousel */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Left fade */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
            background: 'linear-gradient(to right, var(--navy), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
            background: 'linear-gradient(to left, var(--navy), transparent)',
            pointerEvents: 'none',
          }} />

          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 12,
              padding: '16px clamp(24px, 5vw, 72px)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              cursor: 'grab',
            }}
          >
            {services.map((s, i) => {
              const SIcon = s.icon
              const isActive = i === active
              return (
                <div
                  key={i}
                  className="svc-card"
                  onClick={() => goTo(i)}
                  style={{
                    flexShrink: 0,
                    width: isActive ? 240 : 100,
                    height: 280,
                    borderRadius: 12,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(245,200,66,0.15), rgba(245,200,66,0.05))'
                      : 'rgba(255,255,255,0.04)',
                    border: isActive
                      ? '1px solid rgba(245,200,66,0.3)'
                      : '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: isActive ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                    flexShrink: 0,
                  }}>
                    <SIcon size={18} color={isActive ? 'var(--yellow)' : 'rgba(255,255,255,0.4)'} />
                  </div>

                  {/* Title */}
                  <div>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 700,
                      fontSize: isActive ? 15 : 11,
                      color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      lineHeight: 1.3,
                      transition: 'all 0.3s',
                      writingMode: isActive ? 'horizontal-tb' : 'vertical-rl',
                      transform: isActive ? 'none' : 'rotate(180deg)',
                    }}>
                      {s.title}
                    </div>
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', bottom: 16, right: 16,
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--yellow)',
                    }} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, padding: '0 24px' }}>
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? 24 : 6,
                  height: 6, borderRadius: 3,
                  background: i === active ? 'var(--yellow)' : 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease', padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Detail */}
        <div style={{
          padding: 'clamp(24px, 4vw, 56px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Icon large */}
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: 'rgba(245,200,66,0.1)',
            border: '1px solid rgba(245,200,66,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}>
            <Icon size={24} color="var(--yellow)" />
          </div>

          {/* Label */}
          <div className="label" style={{ color: 'var(--yellow)', marginBottom: 12 }}>
            {svc.label}
          </div>

          {/* Headline */}
          <h3
            key={`h-${active}`}
            className="font-display"
            style={{
              fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800,
              color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em',
              marginBottom: 16,
              animation: 'fadeUp 0.35s ease forwards',
            }}
          >
            {svc.headline}
          </h3>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(245,200,66,0.2)', marginBottom: 16, width: 60 }} />

          {/* Description */}
          <p
            key={`p-${active}`}
            style={{
              fontSize: 14, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 24,
              animation: 'fadeUp 0.35s ease 0.06s forwards',
            }}
          >
            {svc.desc}
          </p>

          {/* Features */}
          <div
            key={`f-${active}`}
            style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              marginBottom: 32,
              animation: 'fadeUp 0.35s ease 0.1s forwards',
            }}
          >
            {svc.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 4,
                  background: 'rgba(245,200,66,0.1)',
                  border: '1px solid rgba(245,200,66,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={10} color="var(--yellow)" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contacto"
            className="btn-primary"
            style={{ padding: '13px 24px', borderRadius: 6, width: 'fit-content', fontSize: 13 }}
          >
            <span>Solicitar cotización</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .svc-card:hover {
          border-color: rgba(245,200,66,0.2) !important;
        }
        div[style*="overflow-x: auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}