"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from "../context/appContext"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
      <html className="h-full bg-white">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Bteno</title>
          <meta property="og:image" content="/esos/src/app/logo.png" key="ogimage" />
          <meta name="description" content={'Una experiencia en gestion de seguridad ocupacional. Un producto SaaS para toda la comunidad.'} />

        </head>
        <body className="h-screen">
          <AuthProvider>
            { children }
          </AuthProvider>
        </body>
      </html>
  )
}
