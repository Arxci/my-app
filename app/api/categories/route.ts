import prismaDB from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		const category = await prismaDB.category.create({
			data: {
				name,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORIES_POST]', error)
		return new NextResponse('internal error', { status: 500 })
	}
}

export const GET = async (req: Request) => {
	try {
		const category = await prismaDB.category.findMany()

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_GET]', error)
		return new NextResponse('internal error', { status: 500 })
	}
}
