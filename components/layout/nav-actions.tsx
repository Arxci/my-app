import { auth, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

import CartButton from '../cart/cart-button'
import { cn, isAdmin } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import HamburgerButton from '../hamburger-button'
import { siteConfig } from '@/config/site'
import LoginActions from '../login-actions'

const NavActions = async () => {
	const { userId } = auth()
	const admin = await isAdmin()

	return (
		<div className="ml-auto flex items-center gap-2">
			<CartButton />
			<HamburgerButton
				items={siteConfig.navDesktop}
				admin={admin}
				userId={userId}
			/>
			<LoginActions userId={userId} />
			{admin && (
				<Link href="/dashboard">
					<div
						className={cn(
							buttonVariants({
								variant: 'outline',
							}),
							'hidden lg:flex items-center'
						)}
					>
						Dashboard
						<span className="sr-only">Dashboard</span>
					</div>
				</Link>
			)}
		</div>
	)
}

export default NavActions
