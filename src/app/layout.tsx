import type { Metadata } from 'next'
import '@/app/global.css'

export const metadata: Metadata = {
  title: 'Bio Energy Soluciones Inteligentes | Oil & Gas Venezuela',
  description: 'Proveedor estratégico de recursos, equipos y servicios para la industria petrolera en Venezuela y Latinoamérica.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}