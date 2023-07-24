import { auth, currentUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

import CartButton from '../cart/cart-button'
import { cn, isAdmin } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import HamburgerButton from '../hamburger-button'
import { siteConfig } from '@/config/site'

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
			{userId && (
				<SignOutButton>
					<Button className="hidden lg:block">Sign Out</Button>
				</SignOutButton>
			)}
			{!userId && (
				<Link href="/sign-in">
					<div
						className={cn(
							buttonVariants({
								variant: 'default',
							}),
							'hidden lg:flex items-center'
						)}
					>
						Sign In
						<span className="sr-only">Sign In</span>
					</div>
				</Link>
			)}
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
