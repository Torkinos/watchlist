import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import { ACCENT_COLOR, DEFAULT_APPEARANCE, GRAY_COLOR } from '~/constants/theme'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '~/constants/metaData'
import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './styles/globals.css'
import './styles/reset.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    { name: 'torkinos', url: 'https://torkinos.com' },
    { name: 'KaanDzai', url: 'https://kaandzai.webflow.io' },
  ],
  keywords: ['movies', 'tv shows', 'watchlist', 'discover'],
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Torkinos',
  publisher: 'Torkinos',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: 'https://watchlist.torkinos.com/images/og-image.png',
        alt: 'Watchlist',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          appearance={DEFAULT_APPEARANCE}
          accentColor={ACCENT_COLOR}
          grayColor={GRAY_COLOR}
        >
          {children}
        </Theme>
      </body>
    </html>
  )
}
