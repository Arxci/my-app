'use client'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { auth, useClerk } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface LoginActionProps {
	userId: string | null
}

const LoginActions: React.FC<LoginActionProps> = ({ userId }) => {
	const { signOut } = useClerk()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <Button className="hidden lg:block">Sign In</Button>
	}

	return (
		<>
			{userId && (
				<Button
					className="hidden lg:block"
					onClick={() => signOut()}
				>
					Sign Out
				</Button>
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
		</>
	)
}

export default LoginActions
