import queryString from 'query-string'

import { Product } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}products`

interface Query {
	isFeatured?: boolean
	category?: string
	price?: string
	sort?: string
}

const getProducts = async (query: Query): Promise<Product[]> => {
	const url = queryString.stringifyUrl({
		url: URL,
		query: {
			isFeatured: query.isFeatured,
			category: query.category,
			price: query.price,
			sort: query.sort,
		},
	})

	const res = await fetch(url, {
		cache: 'no-store',
	})

	return res.json()
}

export default getProducts
