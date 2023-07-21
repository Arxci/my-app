'use client'

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button, buttonVariants } from './ui/button'
import { Icons } from './icons'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { MainNavItem } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'

interface HamburgerButtonProps {
	items?: MainNavItem[]
	admin: boolean | null
	userId: string | null
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
	items,
	admin,
	userId,
}) => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="lg:hidden">
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
				<SheetContent className=" pl-1 pr-0">
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
					<ScrollArea className="py-7 h-[calc(100vh-8rem)] pb-10 pl-6 ">
						<div className="pl-1 pr-7">
							<Accordion
								type="single"
								collapsible
								className="w-full"
							>
								{items?.map((item, index) => (
									<AccordionItem
										value={item.title}
										key={index}
									>
										<AccordionTrigger className="text-sm capitalize">
											{item.title}
										</AccordionTrigger>
										<AccordionContent>
											<div className="flex flex-col space-y-2">
												{item.items?.map((subItem, index) =>
													subItem.href ? (
														<MobileLink
															key={index}
															href={String(subItem.href)}
															pathname={pathname}
															setIsOpen={setIsOpen}
															disabled={subItem.disabled}
														>
															{subItem.title}
														</MobileLink>
													) : (
														<div
															key={index}
															className="text-foreground/70 transition-colors"
														>
															{item.title}
														</div>
													)
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
							<SheetFooter className="mt-7 flex flex-col md:flex-row  md:items-center justify-end gap-2">
								{userId && (
									<SignOutButton>
										<Button>Sign Out</Button>
									</SignOutButton>
								)}
								{!userId && (
									<Link href="/sign-in">
										<div
											className={cn(
												buttonVariants({
													variant: 'default',
												}),
												'w-full'
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
												'w-full'
											)}
										>
											Dashboard
											<span className="sr-only">Dashboard</span>
										</div>
									</Link>
								)}
							</SheetFooter>
						</div>
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default HamburgerButton

interface MobileLinkProps {
	children?: React.ReactNode
	href: string
	disabled?: boolean
	pathname: string
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
	children,
	href,
	disabled,
	pathname,
	setIsOpen,
}: MobileLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				'text-foreground/70 transition-colors hover:text-foreground',
				pathname === href && 'text-foreground',
				disabled && 'pointer-events-none opacity-60'
			)}
			onClick={() => setIsOpen(false)}
		>
			{children}
		</Link>
	)
}
