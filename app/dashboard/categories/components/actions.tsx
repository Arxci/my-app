'use client'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import Link from 'next/link'

const CategoriesActions = () => {
	return (
		<>
			<Link
				href="/dashboard/categories/new"
				className={buttonVariants({ variant: 'outline' })}
			>
				<Icons.add />
				Add New
			</Link>
		</>
	)
}

export default CategoriesActions
