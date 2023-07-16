import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { siteConfig } from '@/config/site'
import MainFooter from '@/components/layout/main-footer'
import DashboardHeader from '@/components/layout/dashboard-header'
import { isAdmin } from '@/lib/utils'

export const metadata: Metadata = {
	title: siteConfig.name,
	description: `${siteConfig.name} admin dashboard`,
}

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const admin = await isAdmin()

	if (!admin) {
		redirect('/')
	}

	return (
		<div className=" flex flex-col min-h-screen">
			<DashboardHeader />
			<main className="flex-">{children}</main>
			<MainFooter />
		</div>
	)
}
