'use client'

import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

const DashboardNavDesktop = () => {
	const pathName = usePathname()

	console.log(pathName)

	const NAV_LINKS = [
		{
			id: 0,
			url: '/dashboard',
			label: 'Home',
			isActive: pathName === `/dashboard`,
		},
		{
			id: 1,
			url: '/dashboard/products',
			label: 'Products',
			isActive: pathName === `/dashboard/products`,
		},
	]

	return (
		<ul className="flex items-center gap-6 w-full">
			{NAV_LINKS.map((link) => (
				<NavLink
					key={link.id}
					url={link.url}
					label={link.label}
					isActive={link.isActive}
				/>
			))}
			<div className="ml-auto">
				<SignOutButton>
					<Button>Sign Out</Button>
				</SignOutButton>
			</div>
		</ul>
	)
}

export default DashboardNavDesktop

interface NavLinkProps {
	url: string
	label: string
	isActive: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ url, label, isActive }) => {
	return (
		<li>
			<Link
				href={url}
				className={cn(
					'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
					`${isActive ? 'text-primary font-bold' : undefined}`
				)}
			>
				{label}
			</Link>
		</li>
	)
}
