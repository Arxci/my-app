'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { CategoryColumn } from './column'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { toast } from 'sonner'
import AlertModal from '@/components/modals/alert-modal'
import Link from 'next/link'

interface CategoryCellActionProps {
	data: CategoryColumn
}

export const CategoryCellAction: React.FC<CategoryCellActionProps> = ({
	data,
}) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const { id } = data

	const deleteHandler = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/categories/${id}`)

			router.refresh()
			router.push(`/dashboard/categories`)
			toast.success('Your category has been deleted')
		} catch (error) {
			toast.error('Uh oh! Something went wrong.')
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				loading={loading}
				onConfirm={deleteHandler}
				onClose={() => setOpen(false)}
			/>
			<div className="flex gap-2  items-center ">
				<Link
					href={`/dashboard/categories/${id}`}
					className={buttonVariants({ variant: 'outline' })}
				>
					<Icons.edit className="h-4 w-4" />
					Update
				</Link>
				<Button
					onClick={() => setOpen(true)}
					className="flex gap-2 items-center"
					size="icon"
					variant="destructive"
				>
					<Icons.trash className="h-4 w-4" />
				</Button>
			</div>
		</>
	)
}
