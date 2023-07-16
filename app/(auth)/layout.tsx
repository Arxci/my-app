import MainFooter from '@/components/layout/main-footer'
import AuthHeader from '@/components/layout/auth-header'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className=" flex flex-col min-h-screen">
			<AuthHeader />
			<main className="flex-1">{children}</main>
			<MainFooter />
		</div>
	)
}
