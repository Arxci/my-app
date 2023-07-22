import getProducts from '@/actions/get-products'
import ProductsFilter from './components/ProductsFilter'
import ProductsSort from './components/ProductsSort'

import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import ProductsShowcase from './components/ProductsShowcase'

const ProductsPage = async () => {
	const products = await getProducts({})

	return (
		<div className="mb-6">
			<Container>
				<Heading
					title="Products"
					description="Buy products from our store"
					className="my-10 flex flex-col gap-2"
				/>
				<div className="flex gap-2 mb-6">
					<ProductsFilter />
					<ProductsSort />
				</div>
				<ProductsShowcase products={products} />
			</Container>
		</div>
	)
}

export default ProductsPage
