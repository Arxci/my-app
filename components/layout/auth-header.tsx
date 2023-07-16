import Link from 'next/link'

import Container from '../ui/container'
import { siteConfig } from '@/config/site'

const AuthHeader = () => {
	return (
		<header className="border-b sticky top-0 z-40 bg-background px-4 sm:px-8 ">
			<Container>
				<nav className="h-16 m-auto w-full flex items-center gap-6 ">
					<Link
						aria-label="Home"
						href="/"
						className="hidden font-bold lg:inline-block space-x-2"
					>
						{siteConfig.name}
					</Link>
				</nav>
			</Container>
		</header>
	)
}

export default AuthHeader
