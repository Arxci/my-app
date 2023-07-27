import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import prismaDB from '@/lib/prisma'
import { isAdmin } from '@/lib/utils'

export const PATCH = async (
	req: Request,
	{ params }: { params: { productId: string } }
) => {
	try {
		const { userId } = auth()
		const body = await req.json()
		const admin = await isAdmin()
		const { productId } = params

		const {
			name,
			price,
			description,
			images,
			isFeatured,
			categoryIds,
			onSale,
		} = body

		if (!admin) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!categoryIds || !categoryIds.length) {
			return new NextResponse('Please assign a category is required', {
				status: 400,
			})
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 })
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 })
		}

		if (!productId) {
			return new NextResponse('Product id is required', { status: 400 })
		}

		if (!description) {
			return new NextResponse('Description id is required', { status: 400 })
		}

		await prismaDB.product.update({
			where: { id: productId },
			data: {
				name,
				price,
				description,
				onSale,
				images: {
					deleteMany: {},
				},
				categories: {
					set: [],
				},
				isFeatured,
			},
		})

		const product = await prismaDB.product.update({
			where: {
				id: productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
				categories: {
					connect: [...categoryIds],
				},
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_PATCH]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export const DELETE = async (
	req: Request,
	{ params }: { params: { productId: string } }
) => {
	try {
		const { userId } = auth()
		const { productId } = params
		const admin = await isAdmin()

		if (!admin) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!productId) {
			return new NextResponse('Product id is required', { status: 400 })
		}

		const product = await prismaDB.product.deleteMany({
			where: { id: productId },
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export const GET = async (
	req: Request,
	{ params }: { params: { productId: string } }
) => {
	try {
		const { productId } = params

		if (!productId) {
			return new NextResponse('Product id is required', { status: 400 })
		}

		const product = await prismaDB.product.findUnique({
			where: { id: productId },
			include: {
				images: true,
				categories: true,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
