import Link from 'next/link'

import Container from '@/components/ui/container'
import { siteConfig } from '@/config/site'
import NavDesktop from '@/components/layout/nav-desktop'

const MainHeader = () => {
	return (
		<header>
			<Container>
				<div className="sticky h-16 m-auto w-full  flex items-center gap-6">
					<Link
						href="/"
						className="font-bold"
					>
						{siteConfig.name}
					</Link>
					<NavDesktop />
				</div>
			</Container>
		</header>
	)
}

export default MainHeader
