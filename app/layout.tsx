import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const fontHeading = Outfit({ subsets: ['latin'], variable: '--font-heading' })
const fontBody = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Vainilla & Descanso | Estancia Boutique en Papantla',
  description: 'Un santuario de arquitectura Japandi y espíritu Boho en el corazón de Papantla, Veracruz. Suites exclusivas, piscina curativa y una experiencia sensorial única.',
  keywords: ['Hotel Boutique Papantla', 'Vainilla y Descanso', 'Hospedaje de lujo Veracruz', 'Hotel Japandi México', 'Turismo Papantla'],
  openGraph: {
    title: 'Vainilla & Descanso | El Arte de Descansar',
    description: 'Descubre un refugio donde la tradición Totonaca abraza el lujo contemporáneo.',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vainilla & Descanso Boutique Hotel',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vainilla & Descanso | Papantla Boutique',
    description: 'Suites exclusivas en Veracruz.',
    images: ['/hero.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Componente RootLayout: Define la estructura principal del HTML y carga las fuentes Inter y Outfit.
  return (
    <html lang="es" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
      </body>
    </html>
  )
}
