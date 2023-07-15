import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import MainHeader from '@/components/layout/main-header'
import MainFooter from '@/components/layout/main-footer'
import { siteConfig } from '@/config/site'

import '@/styles/global.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${font.className} flex flex-col`}>
				<MainHeader />
				<main className="relative flex-1">{children}</main>
				<MainFooter />
			</body>
		</html>
	)
}
