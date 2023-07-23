import getProducts from '@/actions/get-products'
import ProductsFilter from './components/ProductsFilter'
import ProductsSort from './components/ProductsSort'

import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import ProductsShowcase from './components/ProductsShowcase'
import prismaDB from '@/lib/prisma'

const ProductsPage = async ({
	searchParams,
}: {
	searchParams: { category: string; price: string }
}) => {
	const { category: categoryFilters, price: currentPrice } = searchParams

	const products = await getProducts({
		category: categoryFilters,
		price: currentPrice,
	})
	const categories = await prismaDB.category.findMany()

	return (
		<div className="mb-6">
			<Container className="px-4 sm:px-8">
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
					/>
					<ProductsSort />
				</div>
				<ProductsShowcase products={products} />
			</Container>
		</div>
	)
}

export default ProductsPage
