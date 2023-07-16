import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import MainFooter from '@/components/layout/main-footer'

export const metadata: Metadata = {
	title: siteConfig.name,
	description: `${siteConfig.name} admin dashboard`,
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className=" flex flex-col min-h-screen">
			<main className="flex-1 bg-red-600">{children}</main>
			<MainFooter />
		</div>
	)
}
