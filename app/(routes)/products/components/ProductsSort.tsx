'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const filterOptions = [
	{
		label: 'ascending',
		option: 'asc',
	},
	{
		label: 'descending',
		option: 'desc',
	},
]

interface ProductsSortProps {
	currentFilters: string[]
	currentPrice: number[]
	currentSort: string
}

const ProductsSort: React.FC<ProductsSortProps> = ({
	currentFilters,
	currentPrice,
	currentSort,
}) => {
	const router = useRouter()

	const updateOptionHandler = (newOption: string) => {
		let category = ''
		let priceRange = { min: 0, max: 500 }
		let sort = filterOptions.filter((item) => item.label === newOption)[0]
			.option

		if (currentFilters) {
			category = currentFilters.join(',')
		}

		if (currentPrice) {
			priceRange = { min: currentPrice[0], max: currentPrice[1] }
		}

		router.push(
			`/products?category=${category}&price=${priceRange.min},${priceRange.max}&sort=${sort}`
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex gap-2">
					<Button
						size="sm"
						className="flex gap-2"
					>
						Sort By
						<Icons.chevronDown className="w-4 h-4" />
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuLabel>Sort By</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={currentSort === 'asc'}
					onCheckedChange={() => updateOptionHandler('ascending')}
				>
					Ascending
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={currentSort === 'desc'}
					onCheckedChange={() => updateOptionHandler('descending')}
				>
					Descending
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProductsSort
