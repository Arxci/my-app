import queryString from 'query-string'

import { Product } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}products`

interface Query {
	category?: string
}

const getSimilarProducts = async (
	query: Query
): Promise<{ pagination: { total: number }; data: Product[] }> => {
	const url = queryString.stringifyUrl({
		url: URL,
		query: {
			category: query.category,

			take: 5,
		},
	})

	const res = await fetch(url, {
		cache: 'no-store',
	})

	return res.json()
}

export default getSimilarProducts
