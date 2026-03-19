'use client'

import { useEffect, useRef, useState } from 'react'
import { Settings, Zap, Droplets, FlaskConical, TestTube, Wrench, Ruler, HardHat, Package } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

const TOTAL = 40
const images = Array.from({ length: TOTAL }, (_, i) => `/images/turbina/turbina-${i + 1}.jpg`)

const services = [
  { icon: Settings,     n: '01', title: 'O&M Integral',          desc: 'Control total de facilidades de producción y supervisión continua en campo.' },
  { icon: Zap,          n: '02', title: 'Generación Eléctrica',   desc: 'Grupos electrógenos y turbinas para campos remotos. Sin conexión a la red.' },
  { icon: Droplets,     n: '03', title: 'Bombeo de Fluidos',      desc: 'Diseño e implementación de sistemas de bombeo e inyección de agua.' },
  { icon: FlaskConical, n: '04', title: 'Tratamiento de Fluidos', desc: 'Plantas PTAP, PTAR y separadores modulares listos para instalar.' },
  { icon: TestTube,     n: '05', title: 'Prueba de Pozos',        desc: 'Separadores, quemadores y medición de fluidos en superficie.' },
  { icon: Wrench,       n: '06', title: 'Mantenimiento',          desc: 'Reparación de rotativos: motores, compresores, bombas y alternadores.' },
  { icon: Ruler,        n: '07', title: 'Metrología',             desc: 'Calibraciones ONAC, fiscalización y auditoría de medición.' },
  { icon: HardHat,      n: '08', title: 'Construcción EPC',       desc: 'Líneas de flujo, oleoductos, tanques y facilidades completas.' },
  { icon: Package,      n: '09', title: 'Repuestos e Insumos',    desc: 'Stock permanente de partes, sellos, rodamientos y químicos.' },
]

export default function ServicesSection() {
  const [currentImg, setCurrentImg] = useState(0)
  const [nextImg, setNextImg] = useState<number | null>(null)
  const [fadeOpacity, setFadeOpacity] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [progress, setProgress] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastService = useRef(0)
  const loadedCount = useRef(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    let mounted = true
    loadedCount.current = 0
    images.forEach((src) => {
      const img = new window.Image()
      img.onload = () => { loadedCount.current++; if (mounted && loadedCount.current === TOTAL) setAllLoaded(true) }
      img.onerror = () => { loadedCount.current++; if (mounted && loadedCount.current === TOTAL) setAllLoaded(true) }
      img.src = src
    })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!allLoaded) return
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setProgress(p)
      const exactIndex = p * (TOTAL - 1)
      const cur = Math.floor(exactIndex)
      const fraction = exactIndex - cur
      if (cur < TOTAL - 1) { setCurrentImg(cur); setNextImg(cur + 1); setFadeOpacity(fraction) }
      else { setCurrentImg(TOTAL - 1); setNextImg(null); setFadeOpacity(0) }
      const svc = Math.min(services.length - 1, Math.floor(p * services.length))
      if (svc !== lastService.current) { lastService.current = svc; setActiveService(svc) }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [allLoaded])

  const svc = services[activeService]
  const Icon = svc.icon
  const pct = Math.round(progress * 100)

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
      `}</style>

      <section id="servicios" ref={containerRef} style={{ height: isMobile ? '400vh' : '200vh', position: 'relative' }}>
        <div id="svc-sticky">

          {/* TEXT */}
          <div id="svc-text" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 64px)',
            paddingTop: 'clamp(80px, 10vh, 100px)',
            borderRight: '1px solid var(--border)',
            position: 'relative', overflow: 'hidden', minWidth: 0,
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${((activeService + 1) / services.length) * 100}%`, background: 'var(--navy)', transition: 'width 0.4s ease' }} />
            </div>

            <div className="label" style={{ marginBottom: 'clamp(6px, 1.2vh, 14px)', fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)' }}>
              Portafolio · {svc.n} / 09
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(10px, 2vh, 18px)' }}>
              <div style={{ width: 'clamp(32px, 4vw, 44px)', height: 'clamp(32px, 4vw, 44px)', borderRadius: 8, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color="var(--yellow)" />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 70px)', color: 'var(--gray-100)', lineHeight: 1 }}>
                {svc.n}
              </span>
            </div>

            <h2 key={`t-${activeService}`} className="font-display" style={{
              fontSize: 'clamp(20px, 3.5vw, 50px)', fontWeight: 800, lineHeight: 1.08,
              color: 'var(--navy)', letterSpacing: '-0.02em',
              marginBottom: 'clamp(6px, 1.5vh, 14px)', wordBreak: 'break-word',
              animation: 'fadeUpSvc 0.35s ease forwards',
            }}>
              {svc.title}
            </h2>

            <p key={`d-${activeService}`} style={{
              fontSize: 'clamp(11px, 1.3vw, 15px)', lineHeight: 1.65, color: 'var(--text-muted)',
              marginBottom: 'clamp(10px, 2vh, 20px)',
              animation: 'fadeUpSvc 0.35s ease 0.06s forwards',
            }}>
              {svc.desc}
            </p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {services.map((s, i) => {
                const SIcon = s.icon
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 7px', borderRadius: 4,
                    background: i === activeService ? 'var(--navy)' : 'var(--gray-100)',
                    transition: 'all 0.3s',
                  }}>
                    <SIcon size={8} color={i === activeService ? 'var(--yellow)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: i === activeService ? 'white' : 'var(--text-muted)' }}>
                      {s.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* IMAGE */}
          <div id="svc-image" style={{ position: 'relative', background: '#000', overflow: 'hidden', touchAction: 'pan-y' }}>
            {!allLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cargando...</span>
              </div>
            )}
            {allLoaded && images.map((src, i) => {
              if (Math.abs(i - currentImg) > 2) return null
              let opacity = 0
              if (i === currentImg) opacity = nextImg !== null ? 1 - fadeOpacity : 1
              else if (i === nextImg) opacity = fadeOpacity
              if (opacity === 0) return null
              return (
                <div key={i} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '12%', opacity }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Turbina frame ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: isMobile ? '10px' : '40px', display: 'block' }} />
                </div>
              )
            })}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '12%', background: '#000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 70, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
              <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Turbogenerador · Bio Energy</span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}