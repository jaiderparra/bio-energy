'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

const TOTAL = 40
const images = Array.from({ length: TOTAL }, (_, i) => `/images/separator/separator-${i + 1}.jpg`)

const steps = [
  {
    label: 'Separador Trifásico · Desarmado',
    title: 'Recursos estratégicos para el petróleo.',
    desc: 'Equipos, repuestos y servicios técnicos especializados posicionados para el mercado venezolano.',
  },
  {
    label: 'Separador Trifásico · Ensamblando',
    title: 'Cada pieza en el lugar correcto.',
    desc: 'Repuestos originales con tiempos de entrega competitivos. Stock permanente para despacho inmediato.',
  },
  {
    label: 'Separador Trifásico · Casi listo',
    title: 'Ingeniería de precisión para Venezuela.',
    desc: 'Personal técnico certificado para instalación, puesta en marcha y operación continua en campo.',
  },
  {
    label: 'Operativo',
    title: 'Listo para operar en Venezuela.',
    desc: 'Bio Energy acompaña cada fase con soporte técnico especializado desde el equipo hasta la puesta en marcha.',
  },
]

export default function HeroSection() {
  const [currentImg, setCurrentImg] = useState(0)
  const [nextImg, setNextImg] = useState<number | null>(null)
  const [fadeOpacity, setFadeOpacity] = useState(0)
  const [textStep, setTextStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastStep = useRef(0)
  const loadedCount = useRef(0)
  const isMobile = useIsMobile()

  // Preload
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

  // Scroll
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
      const s = Math.min(steps.length - 1, Math.floor(p * steps.length))
      if (s !== lastStep.current) { lastStep.current = s; setTextStep(s) }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [allLoaded])

  const step = steps[textStep]
  const pct = Math.round(progress * 100)

  return (
    <>
      {/* Inject responsive CSS */}
      <style>{`
        #hero-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          overflow: hidden;
          background: var(--white);
        }
        @media (max-width: 768px) {
          #hero-sticky {
            grid-template-columns: 1fr !important;
            grid-template-rows: 55% 45% !important;
          }
          #hero-text {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding: 68px 20px 16px !important;
          }
          #hero-image {
            height: 100% !important;
          }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="inicio" ref={containerRef} style={{ height: isMobile ? '400vh' : '200vh', position: 'relative' }}>
        <div id="hero-sticky">

          {/* TEXT */}
          <div
            id="hero-text"
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(24px, 5vw, 72px)',
              paddingTop: 'clamp(80px, 10vh, 100px)',
              borderRight: '1px solid var(--border)',
              position: 'relative', overflow: 'hidden', minWidth: 0,
            }}
          >
            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--navy)', transition: 'width 0.1s linear' }} />
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 'clamp(10px, 2vh, 28px)' }}>
              {steps.map((_, i) => (
                <div key={i} style={{
                  width: i === textStep ? 20 : 6, height: 6, borderRadius: 3,
                  background: i === textStep ? 'var(--navy)' : 'var(--gray-200)',
                  transition: 'all 0.4s ease',
                }} />
              ))}
            </div>

            <div className="label" style={{ marginBottom: 'clamp(8px, 1.5vh, 16px)', fontSize: 'clamp(0.55rem, 1.5vw, 0.68rem)' }}>
              {step.label}
            </div>

            <h1
              key={`t-${textStep}`}
              className="font-display"
              style={{
                fontSize: 'clamp(22px, 4vw, 58px)',
                fontWeight: 800, lineHeight: 1.08,
                color: 'var(--navy)', letterSpacing: '-0.02em',
                marginBottom: 'clamp(8px, 2vh, 20px)',
                wordBreak: 'break-word',
                animation: 'heroFadeUp 0.45s ease forwards',
              }}
            >
              {step.title}
            </h1>

            <p
              key={`d-${textStep}`}
              style={{
                fontSize: 'clamp(12px, 1.5vw, 15px)', lineHeight: 1.65,
                color: 'var(--text-muted)',
                marginBottom: 'clamp(12px, 2.5vh, 28px)',
                animation: 'heroFadeUp 0.45s ease 0.08s forwards',
              }}
            >
              {step.desc}
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="#servicios" className="btn-primary" style={{ padding: 'clamp(9px, 1.5vh, 13px) clamp(14px, 2vw, 24px)', borderRadius: 4, fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
                Ver portafolio <ArrowRight size={12} />
              </a>
              <a href="#oportunidad" className="btn-ghost" style={{ padding: 'clamp(9px, 1.5vh, 13px) clamp(14px, 2vw, 24px)', borderRadius: 4, fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
                La oportunidad
              </a>
            </div>

            <div style={{
              display: 'flex', gap: 'clamp(16px, 3vw, 40px)',
              marginTop: 'clamp(12px, 3vh, 40px)',
              paddingTop: 'clamp(12px, 2vh, 28px)',
              borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}>
              {[{ v: '12+', l: 'Años' }, { v: '9', l: 'Servicios' }, { v: '100%', l: 'Soporte' }].map((s, i) => (
                <div key={i}>
                  <div className="font-display" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div id="hero-image" style={{ position: 'relative', background: '#000', overflow: 'hidden', touchAction: 'pan-y' }}>

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
                  <img src={src} alt={`Frame ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: isMobile ? '12px' : '40px', display: 'block' }} />
                </div>
              )
            })}

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '12%', background: '#000', pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 80, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
              <span style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                Ensamblado · {pct}%
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}