import { currentUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

import CartButton from '../cart/cart-button'
import { isAdmin } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'

const NavActions = async () => {
	const user = await currentUser()
	const admin = await isAdmin()

	return (
		<div className="ml-auto flex items-center gap-2">
			<CartButton />
			{user && (
				<SignOutButton>
					<Button>Sign Out</Button>
				</SignOutButton>
			)}
			{!user && (
				<Link href="/sign-in">
					<div className={buttonVariants({})}>
						Sign In
						<span className="sr-only">Sign In</span>
					</div>
				</Link>
			)}
			{admin && (
				<Link href="/dashboard">
					<div
						className={buttonVariants({
							variant: 'outline',
						})}
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
