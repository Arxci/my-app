import prismaDB from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/utils'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name, description, price, images, isFeatured } = body

		const admin = await isAdmin()

		if (!admin) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!description) {
			return new NextResponse('Description is required', { status: 400 })
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 })
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 })
		}

		const products = await prismaDB.product.create({
			data: {
				name,
				price,
				description,
				isFeatured,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		})

		return NextResponse.json(products)
	} catch (error) {
		console.log('[PRODUCTS_POST]', error)
		return new NextResponse('internal error', { status: 500 })
	}
}

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url)
		const isFeatured = searchParams.get('isFeatured')

		const products = await prismaDB.product.findMany({
			where: {
				isFeatured: isFeatured ? true : undefined,
			},
			include: {
				images: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(products)
	} catch (error) {
		console.log('[PRODUCTS_GET]', error)
		return new NextResponse('internal error', { status: 500 })
	}
}
