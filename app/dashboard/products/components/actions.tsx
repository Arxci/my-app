'use client'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import Link from 'next/link'

const ProductsActions = () => {
	return (
		<>
			<Link
				href="/dashboard/products/new"
				className={buttonVariants({ variant: 'outline' })}
			>
				<Icons.add />
				Add New
			</Link>
		</>
	)
}

export default ProductsActions
