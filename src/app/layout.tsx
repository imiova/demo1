import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ImiovaDemo',
  description: 'Tax-Efficient Investment Strategies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://script.supademo.com/script.js" strategy="afterInteractive" />
      </head>
      <body className={inter.className}>
        {children}
        <Script id="supademo-init">
          {`
            window.Supademo("676938268ca84b1f3bc3005b5af13069cda8cc8ef4daa395f8ac488c74440311", {
              variables: {
                email: "",  // optional user email
                name: ""    // optional user name
              }
            });
          `}
        </Script>
      </body>
    </html>
  )
}