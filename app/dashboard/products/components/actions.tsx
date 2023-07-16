'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const ProductsActions = () => {
	const router = useRouter()

	const addNewHandler = () => {
		router.push('/dashboard/products/new')
	}

	return (
		<>
			<Button
				onClick={addNewHandler}
				variant={'outline'}
			>
				<Icons.add />
				Add New
			</Button>
		</>
	)
}

export default ProductsActions
