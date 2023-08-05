import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import ToasterProvider from '@/context/toaster-provider'

import './globals.css'
import AuthProvider from '@/context/auth-provider'
import { ActiveStatus } from '@/components/active-status'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GolpoKori by MisbahurBD',
  description: 'A NextJs Practice Project by Misbahur Rahman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ActiveStatus />
          <ToasterProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
