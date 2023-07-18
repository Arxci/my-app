import { Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '@/styles/global.css'
import { Toaster } from '@/components/ui/toaster'

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
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	)
}
