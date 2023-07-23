import prismaDB from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/utils'
import { connect } from 'http2'
import { equal } from 'assert'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name, description, price, images, isFeatured, categoryIds } = body

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

		if (!categoryIds || !categoryIds.length) {
			return new NextResponse('Please assign a category is required', {
				status: 400,
			})
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
				categories: {
					connect: [...categoryIds],
				},
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
		const categories = searchParams.get('category')
		const price = searchParams.get('price')
		const formattedPrice = price !== '' ? price?.split(',') : undefined
		const formattedCategories =
			categories !== '' ? categories?.split(',') : undefined

		const products = await prismaDB.product.findMany({
			where: {
				isFeatured: isFeatured ? true : undefined,
				price: {
					gt: Number(formattedPrice ? formattedPrice[0] : 0),
					lt: Number(formattedPrice ? formattedPrice[1] : 500),
				},
				categories: {
					some: {
						name: {
							in: formattedCategories,
						},
					},
				},
			},
			include: {
				images: true,
				categories: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		const filteredProducts = products.filter((product) => {
			if (!formattedCategories) {
				return true
			}
			const names = product.categories.map((cat) => cat.name)
			let checker = (arr: string[], target: string[]) =>
				target.every((v) => arr.includes(v))

			return checker(names, formattedCategories)
		})

		return NextResponse.json(filteredProducts)
	} catch (error) {
		console.log('[PRODUCTS_GET]', error)
		return new NextResponse('internal error', { status: 500 })
	}
}
