import Link from 'next/link'

import Container from '../ui/container'
import DashboardNavDesktop from './dashboard-nav-desktop'

const DashboardHeader = () => {
	return (
		<header className="border-b sticky top-0 z-40 bg-background px-4 sm:px-8">
			<Container>
				<nav className="h-16 m-auto w-full flex items-center gap-6">
					<Link
						href="/"
						className="font-bold text-xl"
					>
						Nike
					</Link>
					<DashboardNavDesktop />
				</nav>
			</Container>
		</header>
	)
}

export default DashboardHeader
