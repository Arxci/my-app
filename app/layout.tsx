import { Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '@/styles/global.css'

const font = Nunito({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${font.className}`}>
					<main className="">{children}</main>
				</body>
			</html>
		</ClerkProvider>
	)
}
