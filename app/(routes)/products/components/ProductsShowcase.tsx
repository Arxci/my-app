import ProductCard from '@/components/product-card'
import { Product } from '@/types'

interface ProductsShowcaseProps {
	products: Product[]
}

const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ products }) => {
	return (
		<div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
			{products &&
				products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
		</div>
	)
}

export default ProductsShowcase
