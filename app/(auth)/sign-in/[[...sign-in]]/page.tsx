import { type Metadata } from 'next'

import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign in to your account',
}

export default async function SignInPage() {
	return (
		<div className="flex justify-center my-10">
			<SignIn />
		</div>
	)
}
