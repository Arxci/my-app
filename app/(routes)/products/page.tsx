import getProducts from '@/actions/get-products'
import ProductsFilter from './components/products-filter'
import ProductsSort from './components/products-sort'
import { type Metadata } from 'next'

import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import ProductsShowcase from './components/products-showcase'
import prismaDB from '@/lib/prisma'
import ProductPagination from './components/product-pagination'

export const metadata: Metadata = {
	title: 'Products',
	description: 'Buy products from our stores',
}

const ProductsPage = async ({
	searchParams,
}: {
	searchParams: {
		category: string
		price: string
		sort: string
		skip: string
		take: string
	}
}) => {
	const {
		category: categoryFilters,
		price: currentPrice,
		sort: currentSort,
		skip,
		take,
	} = searchParams

	const products = await getProducts({
		category: categoryFilters,
		price: currentPrice,
		sort: currentSort,
		skip: skip,
		take: take,
	})

	const categories = await prismaDB.category.findMany()

	return (
		<div className="mb-6 px-4 sm:px-8">
			<Container className="">
				<Heading
					title="Products"
					description="Buy products from our store"
					className="my-10 flex flex-col gap-2"
				/>
				<div className="flex gap-2 mb-6">
					<ProductsFilter
						categories={categories}
						currentFilters={
							categoryFilters?.length === 0 ? [] : categoryFilters?.split(',')
						}
						currentPrice={currentPrice?.split(',').map((price) => {
							return Number(price)
						})}
						currentSort={
							(!currentSort && currentSort !== 'asc') || 'desc'
								? 'desc'
								: currentSort
						}
					/>
					<ProductsSort
						currentFilters={
							categoryFilters?.length === 0 ? [] : categoryFilters?.split(',')
						}
						currentPrice={currentPrice?.split(',').map((price) => {
							return Number(price)
						})}
						currentSort={
							//prettier-ignore
							!currentSort && (currentSort !== 'asc' || 'desc')
								? 'desc'
								: currentSort
						}
					/>
				</div>
				<ProductsShowcase products={products.data} />
				<ProductPagination
					skip={skip ? Number(skip) : 0}
					take={take ? Number(take) : 16}
					maxCount={products.pagination.total}
					currentFilters={
						categoryFilters?.length === 0 ? [] : categoryFilters?.split(',')
					}
					currentPrice={currentPrice?.split(',').map((price) => {
						return Number(price)
					})}
					currentSort={
						(!currentSort && currentSort !== 'asc') || 'desc'
							? 'desc'
							: currentSort
					}
				/>
			</Container>
		</div>
	)
}

export default ProductsPage
