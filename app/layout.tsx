import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const fontHeading = Outfit({ subsets: ['latin'], variable: '--font-heading' })
const fontBody = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Vainilla y Descanso - Boutique Hotel',
  description: 'Descubre la magia y el confort en Vainilla y Descanso. Habitaciones, alberca, restaurante y terraza de lujo.',
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
