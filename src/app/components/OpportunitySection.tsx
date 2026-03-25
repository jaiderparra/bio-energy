'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { useIsMobile } from '@/lib/useIsMobile'

// ─── Imágenes alineadas 1:1 con cada step ────────────────────────────────────
// Step 0 "Crisis SEN · Aliado 360°"           → hero5   (transformador ABB potencia)
// Step 1 "Tres frentes de generación"          → hero13  (campo solar aéreo Colombia)
// Step 2 "Transmisión · Metalmecánica propia"  → hero10  (técnico en subestación AT)
// Step 3 "Alumbrado Inteligente · Eficiencia"  → hero14  (instalación solar techo ABB)
const oppImages = [
  '/images/electricidad/hero5.jpg',
  '/images/electricidad/hero13.png',
  '/images/electricidad/hero10.png',
  '/images/electricidad/hero14.png',
]

const steps = [
  {
    label: 'Sistema Eléctrico Nacional · Crisis',
    title: 'Venezuela necesita un aliado 360° para su sistema eléctrico.',
    desc: 'El SEN enfrenta una crisis estructural. BIonergy no es un intermediario: es el consorcio con capacidad real de ingeniería, construcción y operación para acelerar su recuperación.',
    stat: { v: '360°', l: 'Aliado integral' },
  },
  {
    label: 'Generación · Diversificación Urgente',
    title: 'Tres frentes críticos de generación.',
    desc: 'Hidráulica para aliviar el Bajo Caroní. Fotovoltaica de rápido despliegue en Zulia y Falcón. Respaldo térmico para garantizar el baseload ante contingencias. BIonergy cubre los tres.',
    stat: { v: '3', l: 'Fuentes de generación' },
  },
  {
    label: 'Transmisión · Metalmecánica Propia',
    title: 'La cadena completa. Ningún eslabón faltante.',
    desc: 'Fabricación propia de torres y pórticos de alta tensión. Tendido de líneas. Construcción y modernización de subestaciones. Menos costos de importación, menos tiempos de espera.',
    stat: { v: 'AT/MT/BT', l: 'Redes eléctricas' },
  },
  {
    label: 'Alumbrado Inteligente · Eficiencia',
    title: 'Alumbrado que libera capacidad para el país.',
    desc: 'Modernización de autopistas y vías expresas con tecnología fotovoltaica. El alumbrado se desconecta de la red principal, liberando MW que pueden redirigirse a zonas residenciales e industriales.',
    stat: { v: 'LED', l: 'Gestión remota' },
  },
]

export default function OpportunitySection() {
  const [textStep, setTextStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastStep = useRef(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - window.innerHeight
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
        .opp-img-slide {
          position: absolute; inset: 0;
          transition: opacity 0.5s ease;
        }
      `}</style>

      <section id="oportunidad" ref={containerRef} style={{ height: `${steps.length * 100}vh`, position: 'relative' }}>
        <div id="opp-sticky">

          {/* ── IMAGE ── */}
          <div id="opp-image" style={{ position: 'relative', background: '#0e2248', overflow: 'hidden' }}>
            {oppImages.map((src, i) => (
              <div key={i} className="opp-img-slide" style={{ opacity: i === imgIndex ? 1 : 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={steps[i].label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,34,72,0.2), rgba(14,34,72,0.6))' }} />
              </div>
            ))}

            {/* Stat overlay */}
            <div style={{ position: 'absolute', top: isMobile ? 10 : 32, left: isMobile ? 14 : 32, zIndex: 2 }}>
              <div
                key={`stat-${textStep}`}
                style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: isMobile ? 24 : 'clamp(32px, 4vw, 52px)',
                  color: 'var(--yellow)', lineHeight: 1,
                  animation: 'fadeUp 0.4s ease forwards',
                }}
              >
                {step.stat.v}
              </div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
                {step.stat.l}
              </div>
            </div>

            {/* Progress bar bottom */}
            <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 70, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--yellow)', transition: 'width 0.1s linear' }} />
              </div>
              <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>SEN · Venezuela</span>
            </div>
          </div>

          {/* ── TEXT ── */}
          <div id="opp-text" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 64px)',
            background: 'var(--off-white)',
            borderLeft: '1px solid var(--border)',
            position: 'relative', overflow: 'hidden', minWidth: 0,
          }}>
            {/* Progress bar top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gray-100)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--navy)', transition: 'width 0.1s linear' }} />
            </div>

            {/* Step dots */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 'clamp(8px, 1.5vh, 20px)' }}>
              {steps.map((_, i) => (
                <div key={i} style={{
                  width: i === textStep ? 20 : 6, height: 6, borderRadius: 3,
                  background: i === textStep ? 'var(--navy)' : 'var(--gray-200)',
                  transition: 'all 0.4s ease',
                }} />
              ))}
            </div>

            <div className="label" style={{ marginBottom: 'clamp(6px, 1vh, 12px)', fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)' }}>
              {step.label}
            </div>

            <h2
              key={`t-${textStep}`}
              className="font-display"
              style={{
                fontSize: 'clamp(20px, 3.2vw, 44px)', fontWeight: 800, lineHeight: 1.08,
                color: 'var(--navy)', letterSpacing: '-0.02em',
                marginBottom: 'clamp(8px, 1.5vh, 16px)', wordBreak: 'break-word',
                animation: 'fadeUp 0.45s ease forwards',
              }}
            >
              {step.title}
            </h2>

            <p
              key={`d-${textStep}`}
              style={{
                fontSize: 'clamp(11px, 1.3vw, 15px)', lineHeight: 1.7, color: 'var(--text-muted)',
                marginBottom: 'clamp(12px, 2vh, 24px)',
                animation: 'fadeUp 0.45s ease 0.08s forwards',
              }}
            >
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