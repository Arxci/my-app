import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import MainHeader from '@/components/layout/main-header'
import MainFooter from '@/components/layout/main-footer'

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
		<div className=" flex flex-col min-h-screen">
			<MainHeader />
			<main className="flex-1">{children}</main>
			<MainFooter />
		</div>
	)
}
