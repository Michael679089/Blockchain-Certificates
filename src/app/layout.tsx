import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '../components/client-sided/rainbowkit/Providers';

export const metadata: Metadata = {
  title: 'Blockchain Certs',
  description: '--',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
