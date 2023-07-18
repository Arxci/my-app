'use client'

import { useState } from 'react'
import { Image, Product } from '@prisma/client'
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'
import AlertModal from '../modals/alert-modal'
import ImageUpload from '@/components/ui/image-upload'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().min(1),
	images: z.object({ url: z.string() }).array(),
	isFeatured: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
	initialData: (Product & { images: Image[] }) | null
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const params = useParams()
	const router = useRouter()
	const { productId } = params

	const title = initialData ? 'Edit product' : 'Create product'
	const description = initialData ? 'Edit a product' : 'Add a new product'
	const toastMessage = initialData ? 'Product updated.' : 'Product created.'
	const action = initialData ? 'Save changes' : 'Create product'

	const defaultValues = initialData
		? {
				...initialData,
				price: parseFloat(String(initialData?.price)),
		  }
		: {
				name: '',
				description,
				price: 0,
				images: [],
				isFeatured: false,
		  }

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const submitFormHandler = async (data: ProductFormValues) => {
		try {
			setLoading(true)
			if (initialData) {
				await axios.patch(`/api/products/${productId}`, data)
			} else {
				await axios.post(`/api/products`, data)
			}

			router.refresh()
			router.push(`/dashboard/products`)
			toast.success(toastMessage)
		} catch (error) {
			toast.error('Uh oh! Something went wrong.')
		} finally {
			setLoading(false)
		}
	}

	const deleteBillboardHandler = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/products/${productId}`)

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
				onClose={() => setOpen(false)}
				onConfirm={deleteBillboardHandler}
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
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitFormHandler)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem className="py-2">
								<FormLabel className=" text-xl">Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((image) => image.url)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="9.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Is Featured</FormLabel>
										<FormDescription>
											Should this product appear on the home page?
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={loading}
											aria-readonly
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										disabled={loading}
										className="resize-none h-[200px]"
										placeholder="Product description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						disabled={loading}
						className="ml-auto"
						type="submit"
					>
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}

export default ProductForm
