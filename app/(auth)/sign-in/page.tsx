import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { SignInForm } from '@/components/forms/signin-form'
import { Shell } from '@/components/shells/shell'

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign in to your account',
}

export default async function SignInPage() {
	const user = await currentUser()
	if (user) redirect('/dashboard')

	return (
		<Shell className="max-w-lg">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>
						Sign in using your email and password
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<SignInForm />
				</CardContent>
			</Card>
		</Shell>
	)
}
