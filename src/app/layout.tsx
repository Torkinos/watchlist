import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './styles/globals.css'
import './styles/reset.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Watchlist',
  description:
    'Who needs a social life when there are so many things to watch?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="indigo" grayColor="slate">
          {children}
        </Theme>
      </body>
    </html>
  )
}
