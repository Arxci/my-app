import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismaDB from '@/lib/prisma'

export const PATCH = async (
	req: Request,
	{ params }: { params: { categoryId: string } }
) => {
	try {
		const { userId } = auth()
		const body = await req.json()
		const { categoryId } = params

		const { name } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 })
		}

		const category = await prismaDB.category.updateMany({
			where: { id: categoryId },
			data: {
				name,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export const DELETE = async (
	req: Request,
	{ params }: { params: { categoryId: string } }
) => {
	try {
		const { userId } = auth()
		const { categoryId } = params

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 })
		}

		const category = await prismaDB.category.deleteMany({
			where: { id: categoryId },
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export const GET = async (
	req: Request,
	{ params }: { params: { categoryId: string } }
) => {
	try {
		const { categoryId } = params

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 })
		}

		const category = await prismaDB.category.findUnique({
			where: { id: categoryId },
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
