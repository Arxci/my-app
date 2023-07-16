import * as z from 'zod'

export const authSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	password: z.string(),
})
