'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

// ─── Imágenes alineadas 1:1 con cada step ────────────────────────────────────
// Step 0 "Subestaciones · Alta Tensión"     → hero1  (subestación exterior AT)
// Step 1 "Transmisión · Líneas AT"          → hero2  (técnico bucket truck AT)
// Step 2 "Energías Renovables · Solar"      → hero3  (campo solar panorámico)
// Step 3 "Redes de Distribución MT/BT"      → hero4  (trabajo redes urbanas)
const heroImages = [
  '/images/electricidad/hero1.png',
  '/images/electricidad/hero2.jpg',
  '/images/electricidad/hero3.png',
  '/images/electricidad/hero4.jpg',
]

const steps = [
  {
    label: 'Subestaciones · Alta Tensión',
    title: 'Solución Integral para la Soberanía Eléctrica.',
    desc: 'BIonergy es el brazo ejecutor privado que acelera la recuperación del Sistema Eléctrico Nacional. No somos intermediarios: somos un consorcio con capacidad propia de ingeniería, construcción y operación.',
  },
  {
    label: 'Transmisión · Líneas de Alta Tensión',
    title: 'Del diseño a la puesta en marcha.',
    desc: 'Capital intelectual para llevar cada proyecto desde la ingeniería de detalle hasta el comisionamiento final bajo estándares internacionales EPC.',
  },
  {
    label: 'Energías Renovables · Solar Fotovoltaica',
    title: 'Generación diversificada y resiliente.',
    desc: 'Hidráulica, fotovoltaica y respaldo térmico. Tres frentes críticos para reducir la dependencia del Bajo Caroní y garantizar el baseload nacional.',
  },
  {
    label: 'Redes de Distribución · Media y Baja Tensión',
    title: 'Ciclo de vida completo. Resultados reales.',
    desc: 'Diseño, Construcción, Puesta en Marcha y Mantenimiento Post-Venta. Cada bolívar invertido se traduce en estabilidad eléctrica real para Venezuela.',
  },
]

export default function HeroSection() {
  const [textStep, setTextStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastStep = useRef(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    let count = 0
    heroImages.forEach(src => {
      const img = new window.Image()
      img.onload = img.onerror = () => { count++; if (count === heroImages.length) setLoaded(true) }
      img.src = src
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setProgress(p)
      const s = Math.min(steps.length - 1, Math.floor(p * steps.length))
      if (s !== lastStep.current) { lastStep.current = s; setTextStep(s) }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const step = steps[textStep]
  const pct = Math.round(progress * 100)
  const imgIndex = textStep // 1:1 imagen ↔ step

  return (
    <>
      <style>{`
        #hero-sticky {
          position: sticky; top: 0; width: 100%;
          height: 100vh; height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          #hero-image { height: 100% !important; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-img-slide {
          position: absolute; inset: 0;
          transition: opacity 0.5s ease;
        }
      `}</style>

      <section id="inicio" ref={containerRef} style={{ height: `${steps.length * 100}vh`, position: 'relative' }}>
        <div id="hero-sticky">

          {/* ── TEXT ── */}
          <div id="hero-text" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(24px, 5vw, 72px)',
            paddingTop: 'clamp(80px, 10vh, 100px)',
            borderRight: '1px solid var(--border)',
            position: 'relative', overflow: 'hidden', minWidth: 0,
          }}>
            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--navy)', transition: 'width 0.1s linear' }} />
            </div>

            {/* Step dots */}
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
                fontSize: 'clamp(22px, 3.8vw, 54px)',
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
                fontSize: 'clamp(12px, 1.4vw, 15px)', lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: 'clamp(12px, 2.5vh, 28px)',
                animation: 'heroFadeUp 0.45s ease 0.08s forwards',
              }}
            >
              {step.desc}
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="#servicios" className="btn-primary" style={{ padding: 'clamp(9px, 1.5vh, 13px) clamp(14px, 2vw, 24px)', borderRadius: 4, fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
                Ver capacidades <ArrowRight size={12} />
              </a>
              <a href="#oportunidad" className="btn-ghost" style={{ padding: 'clamp(9px, 1.5vh, 13px) clamp(14px, 2vw, 24px)', borderRadius: 4, fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
                El sistema eléctrico
              </a>
            </div>

            <div style={{
              display: 'flex', gap: 'clamp(16px, 3vw, 40px)',
              marginTop: 'clamp(12px, 3vh, 40px)',
              paddingTop: 'clamp(12px, 2vh, 28px)',
              borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}>
              {[{ v: 'EPC', l: 'Capacidad Propia' }, { v: '360°', l: 'Consorcio Integral' }, { v: 'O&M', l: 'Ciclo Completo' }].map((s, i) => (
                <div key={i}>
                  <div className="font-display" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── IMAGE ── */}
          <div id="hero-image" style={{ position: 'relative', background: '#0a1628', overflow: 'hidden' }}>
            {!loaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cargando...</span>
              </div>
            )}
            {loaded && heroImages.map((src, i) => (
              <div key={i} className="hero-img-slide" style={{ opacity: i === imgIndex ? 1 : 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={steps[i].label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.55) 100%)' }} />
              </div>
            ))}

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to top, rgba(10,22,40,0.9), transparent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Zap size={14} color="var(--yellow)" />
                <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>
                  BIonergy · {step.label}
                </span>
              </div>
              <div style={{ marginTop: 10, width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}