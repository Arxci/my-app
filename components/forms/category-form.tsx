'use client'

import { useState } from 'react'
import { Category } from '@prisma/client'
import { Trash } from 'lucide-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'
import AlertModal from '../modals/alert-modal'

const formSchema = z.object({
	name: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
	initialData: Category | null
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const params = useParams()
	const router = useRouter()
	const { categoryId } = params

	const title = initialData ? 'Edit category' : 'Create category'
	const description = initialData ? 'Edit a category' : 'Add a new category'
	const toastMessage = initialData ? 'Category updated.' : 'Category created.'
	const action = initialData ? 'Save changes' : 'Create category'

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
		},
	})

	const submitFormHandler = async (data: CategoryFormValues) => {
		try {
			setLoading(true)
			if (initialData) {
				await axios.patch(`/api/categories/${categoryId}`, data)
			} else {
				await axios.post(`/api/categories`, data)
			}

			router.refresh()
			router.push(`/dashboard/categories`)
			toast.success(toastMessage)
		} catch (error) {
			toast.error('Uh oh! Something went wrong.')
		} finally {
			setLoading(false)
		}
	}

	const cancelEditHandler = () => {
		router.push(`/dashboard/categories`)
		toast('Edit cancelled')
	}

	const deleteProductHandler = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/categories/${categoryId}`)

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
				onClose={() => setOpen(false)}
				onConfirm={deleteProductHandler}
				loading={loading}
			/>
			<div className="flex items-center justify-between py-6">
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="icon"
						onClick={() => setOpen(true)}
						className="flex gap-2"
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator className="mb-4" />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitFormHandler)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-end">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Category name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className="ml-auto"
						type="submit"
					>
						{action}
					</Button>
					<Button
						disabled={loading}
						className="ml-2"
						onClick={cancelEditHandler}
						variant="outline"
						type="button"
					>
						Cancel
					</Button>
				</form>
			</Form>
		</>
	)
}

export default CategoryForm
