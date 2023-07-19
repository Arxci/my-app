import ProductCard from '@/components/product-card'
import { Product } from '@/types'

interface FavoritesShowcaseProps {
	favorites: Product[]
}

const FavoritesShowcase: React.FC<FavoritesShowcaseProps> = ({ favorites }) => {
	return (
		<div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
			{favorites &&
				favorites.map((favorite) => (
					<ProductCard
						key={favorite.id}
						product={favorite}
					/>
				))}
		</div>
	)
}

export default FavoritesShowcase
