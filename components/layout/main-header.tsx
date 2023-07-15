import Container from '@/components/ui/container'

import NavDesktop from '@/components/layout/nav-desktop'
import { siteConfig } from '@/config/site'
import NavActions from '@/components/layout/nav-actions'

const MainHeader = () => {
	return (
		<header className="border-b sticky top-0 z-20 bg-background px-2 lg:px-4">
			<Container>
				<nav className=" h-16 m-auto w-full  flex items-center gap-6">
					<NavDesktop items={siteConfig.navDesktop} />
					<NavActions />
				</nav>
			</Container>
		</header>
	)
}

export default MainHeader
