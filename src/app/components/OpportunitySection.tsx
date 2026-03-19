'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

const TOTAL = 40
const images = Array.from({ length: TOTAL }, (_, i) => `/images/bomba/bomba-${i + 1}.jpg`)

const steps = [
  { label: 'Bomba Centrífuga · Desarmada', title: 'Venezuela abre sus puertas al mundo.', desc: 'Con las mayores reservas probadas del planeta y un sector en plena reactivación, Venezuela representa la oportunidad más grande de la década.', stat: { v: '#1', l: 'Reservas mundiales' } },
  { label: 'Bomba Centrífuga · Ensamblando', title: 'Los primeros en llegar definen las reglas.', desc: 'PDVSA e IOCs privadas necesitan proveedores calificados con entrega inmediata. La ventana 2025 es única.', stat: { v: '300B', l: 'Barriles probados' } },
  { label: 'Bomba Centrífuga · Casi lista', title: 'Colombia es la puerta de entrada.', desc: 'Proximidad geográfica, cultural y logística que los competidores internacionales no tienen.', stat: { v: '>10x', l: 'Potencial de producción' } },
  { label: 'Bomba Centrífuga · Operativa', title: 'Posiciónese ahora.', desc: 'Bio Energy lleva soluciones probadas a un sector que requiere proveedores confiables de alto estándar técnico.', stat: { v: '2025', l: 'Ventana óptima' } },
]

export default function OpportunitySection() {
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
      <style>{`
        #opp-sticky {
          position: sticky; top: 0; width: 100%;
          height: 100vh; height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border-top: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          #opp-sticky {
            grid-template-columns: 1fr !important;
            grid-template-rows: 45% 55% !important;
          }
          #opp-image { order: -1; }
          #opp-text {
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
            padding: 16px 20px !important;
          }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="oportunidad" ref={containerRef} style={{ height: isMobile ? '400vh' : '200vh', position: 'relative' }}>
        <div id="opp-sticky">

          {/* IMAGE */}
          <div id="opp-image" style={{ position: 'relative', background: '#0e2248', overflow: 'hidden', touchAction: 'pan-y' }}>
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
                  <img src={src} alt={`Bomba frame ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: isMobile ? '10px' : '40px', display: 'block' }} />
                </div>
              )
            })}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '12%', background: '#0e2248', pointerEvents: 'none' }} />

            {/* Stat */}
            <div style={{ position: 'absolute', top: isMobile ? 10 : 32, left: isMobile ? 14 : 32, zIndex: 2 }}>
              <div key={`stat-${textStep}`} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: isMobile ? 24 : 'clamp(32px, 4vw, 52px)', color: 'var(--yellow)', lineHeight: 1, animation: 'fadeUp 0.4s ease forwards' }}>
                {step.stat.v}
              </div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
                {step.stat.l}
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 70, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
              <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Ensamblado · {pct}%</span>
            </div>
          </div>

          {/* TEXT */}
          <div id="opp-text" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 64px)',
            background: 'var(--off-white)',
            borderLeft: '1px solid var(--border)',
            position: 'relative', overflow: 'hidden', minWidth: 0,
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--navy)', transition: 'width 0.1s linear' }} />
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 'clamp(8px, 1.5vh, 20px)' }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: i === textStep ? 20 : 6, height: 6, borderRadius: 3, background: i === textStep ? 'var(--navy)' : 'var(--gray-200)', transition: 'all 0.4s ease' }} />
              ))}
            </div>

            <div className="label" style={{ marginBottom: 'clamp(6px, 1vh, 12px)', fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)' }}>{step.label}</div>

            <h2 key={`t-${textStep}`} className="font-display" style={{
              fontSize: 'clamp(20px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.08,
              color: 'var(--navy)', letterSpacing: '-0.02em',
              marginBottom: 'clamp(8px, 1.5vh, 16px)', wordBreak: 'break-word',
              animation: 'fadeUp 0.45s ease forwards',
            }}>
              {step.title}
            </h2>

            <p key={`d-${textStep}`} style={{
              fontSize: 'clamp(11px, 1.3vw, 15px)', lineHeight: 1.65, color: 'var(--text-muted)',
              marginBottom: 'clamp(12px, 2vh, 24px)',
              animation: 'fadeUp 0.45s ease 0.08s forwards',
            }}>
              {step.desc}
            </p>

            <a href="#contacto" className="btn-primary" style={{ padding: 'clamp(9px, 1.5vh, 13px) clamp(14px, 2vw, 24px)', borderRadius: 4, width: 'fit-content', fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
              Agendar reunión <TrendingUp size={12} />
            </a>

            <div style={{ marginTop: 'clamp(12px, 2vh, 28px)', paddingTop: 'clamp(10px, 1.5vh, 20px)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: 'clamp(9px, 1.1vw, 11px)', color: 'var(--text-muted)' }}>Expansión activa · Venezuela 2025</span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}