'use client'

import { SignOutButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Icons } from './icons'
import { siteConfig } from '@/config/site'

const DashboardHamburgerButton = () => {
	const pathName = usePathname()
	const [isOpen, setIsOpen] = useState(false)

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
		{
			id: 2,
			url: '/dashboard/categories',
			label: 'Categories',
			isActive: pathName === `/dashboard/categories`,
		},
		{
			id: 2,
			url: '/dashboard/orders',
			label: 'Orders',
			isActive: pathName === `/dashboard/orders`,
		},
	]

	return (
		<div className="lg:hidden ml-auto">
			<Sheet
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SheetTrigger asChild>
					<Button
						aria-label="Toggle Menu"
						className=" px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
						variant="outline"
						size="icon"
					>
						<Icons.menu
							className="h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				</SheetTrigger>
				<SheetContent className=" pl-1 pr-0 w-full">
					<div className="px-7">
						<Link
							aria-label="Home"
							href="/"
							className="flex items-center"
							onClick={() => setIsOpen(false)}
						>
							<span className="font-bold">{siteConfig.name}</span>
						</Link>
					</div>
					<ul className="flex flex-col items-end gap-6 w-full px-7 pt-10">
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
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default DashboardHamburgerButton

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
					'text-sm font-medium  text-muted-foreground transition-colors hover:text-primary',
					`${isActive ? 'text-primary font-bold' : undefined}`
				)}
			>
				{label}
			</Link>
		</li>
	)
}

/*
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


*/
