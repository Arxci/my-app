import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import MainFooter from '@/components/layout/main-footer'
import DashboardHeader from '@/components/layout/dashboard-header'

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
			<DashboardHeader />
			<main className="flex-">{children}</main>
			<MainFooter />
		</div>
	)
}
