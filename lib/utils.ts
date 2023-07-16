import { type ClassValue, clsx } from 'clsx'
import { isClerkAPIResponseError } from '@clerk/nextjs'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { currentUser } from '@clerk/nextjs'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
}

export function catchClerkError(err: unknown) {
	const unknownErr = 'Something went wrong, please try again later.'
	if (isClerkAPIResponseError(err)) {
		return toast.error(err.errors[0]?.longMessage ?? unknownErr)
	} else {
		return toast.error(unknownErr)
	}
}

export const isAdmin = async () => {
	const user = await currentUser()

	if (!user) {
		return null
	}

	return user.publicMetadata.userType === 'admin'
}
