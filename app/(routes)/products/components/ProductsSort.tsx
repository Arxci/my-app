import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const ProductsSort = () => {
	return (
		<div className="flex gap-2">
			<Button
				size="sm"
				className="flex gap-2"
			>
				Sort
				<Icons.chevronDown className="w-4 h-4" />
			</Button>
		</div>
	)
}

export default ProductsSort
