'use client'

import { useRouter } from 'next/navigation'

import { ProductsColumn } from './column'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

interface ProductCellActionProps {
	data: ProductsColumn
}

export const ProductCellAction: React.FC<ProductCellActionProps> = ({
	data,
}) => {
	const router = useRouter()
	const { id } = data

	const updateHandler = () => {
		router.push(`/dashboard/products/${id}`)
	}

	return (
		<>
			<Button
				onClick={updateHandler}
				className="flex gap-2 items-center"
				variant="secondary"
			>
				<Icons.edit className="h-4 w-4" />
				Update
			</Button>
		</>
	)
}
