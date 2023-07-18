'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { ProductsColumn } from './column'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { toast } from 'sonner'
import AlertModal from '@/components/modals/alert-modal'

interface ProductCellActionProps {
	data: ProductsColumn
}

export const ProductCellAction: React.FC<ProductCellActionProps> = ({
	data,
}) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const { id } = data

	const updateHandler = () => {
		router.push(`/dashboard/products/${id}`)
	}

	const deleteHandler = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/products/${id}`)

			router.refresh()
			router.push(`/dashboard/products`)
			toast.success('Your product has been deleted')
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
			<div className="flex gap-2 items-center">
				<Button
					onClick={updateHandler}
					className="flex gap-2 items-center"
					variant="secondary"
				>
					<Icons.edit className="h-4 w-4" />
					Update
				</Button>
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
