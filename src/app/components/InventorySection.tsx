'use client'

import { useEffect, useRef, useState } from 'react'
import { Package, CheckCircle, Clock, Truck } from 'lucide-react'

const categories = [
  {
    cat: 'Equipos de Generación',
    items: [
      { name: 'Grupos Electrógenos Diesel', spec: '20 kVA – 2000 kVA', avail: 'Disponible' },
      { name: 'Turbogeneradores Gas', spec: '500 kW – 5 MW', avail: 'Cotizar' },
      { name: 'Tableros de Control ATS', spec: 'Low & Medium Voltage', avail: 'Disponible' },
    ],
  },
  {
    cat: 'Sistemas de Bombeo',
    items: [
      { name: 'Bombas Centrifugas API 610', spec: 'Varias capacidades', avail: 'Disponible' },
      { name: 'Bombas Sumergibles ESP', spec: 'Serie Weatherford / Baker', avail: 'Cotizar' },
      { name: 'Manifolds y Válvulas', spec: 'ANSI / API 6D', avail: 'Disponible' },
    ],
  },
  {
    cat: 'Tratamiento de Crudo',
    items: [
      { name: 'Separadores Trifásicos', spec: '150 PSI – 600 PSI', avail: 'Disponible' },
      { name: 'Deshidratadores Electrostáticos', spec: 'Horizontal / Vertical', avail: 'Cotizar' },
      { name: 'Tanques de Almacenamiento', spec: 'API 650 / 12F', avail: 'Disponible' },
    ],
  },
  {
    cat: 'Instrumentación & Metrología',
    items: [
      { name: 'Medidores de Flujo Fiscal', spec: 'Coriolis / Turbina', avail: 'Disponible' },
      { name: 'Transmisores de Presión', spec: 'Rosemount / ABB', avail: 'Disponible' },
      { name: 'Sistemas de Control DCS/PLC', spec: 'Varios fabricantes', avail: 'Cotizar' },
    ],
  },
  {
    cat: 'Repuestos & Insumos',
    items: [
      { name: 'Sellos Mecánicos Pumps', spec: 'API 682 compliant', avail: 'Disponible' },
      { name: 'Rodamientos SKF / FAG', spec: 'Todo el portafolio', avail: 'Disponible' },
      { name: 'Chemicals para Tratamiento', spec: 'Inhibidores, biocidas', avail: 'Disponible' },
    ],
  },
  {
    cat: 'Líneas de Flujo',
    items: [
      { name: 'Tuberías API 5L', spec: 'Gr. B, X42, X52, X65', avail: 'Disponible' },
      { name: 'Conexiones y Fittings', spec: 'ASME B16.9 / B16.11', avail: 'Disponible' },
      { name: 'Válvulas de Control', spec: 'Fisher / Metso', avail: 'Cotizar' },
    ],
  },
]

export default function InventorySection() {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="inventario" className="relative py-32 overflow-hidden bg-[#080e14]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gold opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label line-deco">Inventario Disponible</span>
          <div className="mt-4 grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95]">
              <span className="text-gradient-white">STOCK LISTO</span><br />
              <span className="text-gradient-gold">PARA DESPACHO</span>
            </h2>
            <div>
              <p className="text-[#8a9aaa] text-base leading-relaxed font-300 mb-4">
                Mantenemos inventario activo de equipos, repuestos y materiales críticos
                para reducir tiempos de parada y garantizar continuidad operativa en Venezuela.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Clock, text: 'Entrega Express' },
                  { icon: Truck, text: 'Logística Internacional' },
                  { icon: Package, text: 'Stock Permanente' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon size={13} className="text-[#c8952a]" />
                      <span className="font-condensed text-xs uppercase tracking-wider text-[#8a9aaa]">
                        {item.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div
          className={`mt-12 flex flex-wrap gap-2 transition-all duration-800 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`font-condensed text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm border transition-all duration-300 ${
                activeTab === i
                  ? 'bg-[rgba(200,149,42,0.15)] border-[rgba(200,149,42,0.4)] text-[#c8952a]'
                  : 'bg-transparent border-[rgba(255,255,255,0.06)] text-[#4a5a6a] hover:border-[rgba(255,255,255,0.12)] hover:text-[#8a9aaa]'
              }`}
            >
              {cat.cat}
            </button>
          ))}
        </div>

        {/* Items table */}
        <div
          className={`mt-6 card-glass rounded-sm overflow-hidden transition-all duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          key={activeTab}
          style={{ animation: 'fadeInUp 0.3s ease forwards' }}
        >
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(200,149,42,0.04)]">
            <div className="col-span-5 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4a5a6a]">
              Producto / Equipo
            </div>
            <div className="col-span-4 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4a5a6a]">
              Especificaciones
            </div>
            <div className="col-span-3 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4a5a6a]">
              Estado
            </div>
          </div>

          {categories[activeTab].items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(200,149,42,0.03)] transition-colors group"
            >
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(200,149,42,0.5)] flex-shrink-0" />
                <span className="font-condensed text-sm text-[#f0ede8] group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="col-span-4">
                <span className="font-condensed text-sm text-[#4a5a6a]">{item.spec}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    item.avail === 'Disponible' ? 'bg-[#1a9e5c]' : 'bg-[#c8952a]'
                  }`}
                />
                <span
                  className={`font-condensed text-xs uppercase tracking-wider ${
                    item.avail === 'Disponible' ? 'text-[#1a9e5c]' : 'text-[#c8952a]'
                  }`}
                >
                  {item.avail}
                </span>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-between bg-[rgba(255,255,255,0.01)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1a9e5c]" />
                <span className="font-condensed text-xs text-[#4a5a6a]">Disponible inmediato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#c8952a]" />
                <span className="font-condensed text-xs text-[#4a5a6a]">Disponible por cotización</span>
              </div>
            </div>
            <a href="#contacto" className="btn-primary px-5 py-2 text-xs rounded-sm">
              <span>Solicitar Cotización</span>
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`mt-8 text-center transition-all duration-800 delay-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-condensed text-xs text-[#2a3a4a] uppercase tracking-wider">
            Este es un extracto representativo · Contacte para inventario completo actualizado
          </p>
        </div>
      </div>
    </section>
  )
}