import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TEDxPetalingStreet Badge Hub",
  description: "Earn badges and track your TEDx journey",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans text-gray-800 bg-white">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
