'use client'
import { Button } from '@/components/ui/button'
import router from 'next/navigation'
import { useRouter } from 'next/navigation'

interface ProductPaginationProps {
	skip: number
	take: number
	maxCount: number
	currentFilters: string[]
	currentPrice: number[]
	currentSort: string
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
	skip = 0,
	take = 16,
	maxCount,
	currentFilters,
	currentPrice,
	currentSort,
}) => {
	const router = useRouter()

	const nextHandler = () => {
		let category = ''
		let priceRange = { min: 0, max: 500 }

		if (currentFilters) {
			category = currentFilters.join(',')
		}

		if (currentPrice) {
			priceRange = { min: currentPrice[0], max: currentPrice[1] }
		}

		router.push(
			`/products?category=${category}&price=${priceRange.min},${
				priceRange.max
			}&sort=${currentSort}&skip=${skip + 16}&take=${16}`
		)
	}

	const previousHandler = () => {
		let category = ''
		let priceRange = { min: 0, max: 500 }

		if (currentFilters) {
			category = currentFilters.join(',')
		}

		if (currentPrice) {
			priceRange = { min: currentPrice[0], max: currentPrice[1] }
		}

		router.push(
			`/products?category=${category}&price=${priceRange.min},${
				priceRange.max
			}&sort=${currentSort}&skip=${skip - 16}&take=${16}`
		)
	}

	return (
		<div className="flex w-full justify-end gap-2 pt-6">
			<Button
				variant="default"
				disabled={!skip || skip === 0}
				className="w-[100px]"
				onClick={previousHandler}
			>
				Previous
			</Button>
			<Button
				variant="default"
				className="w-[100px]"
				disabled={maxCount - skip <= take}
				onClick={nextHandler}
			>
				Next
			</Button>
		</div>
	)
}

export default ProductPagination
