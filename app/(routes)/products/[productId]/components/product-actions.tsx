'use client'

import { Input } from '@/components/ui/input'
import useCart from '@/hooks/use-cart'
import { Product, Image, Category } from '@prisma/client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types'

interface ProductActionsProps {
	product: (Product & { images: Image[]; categories: Category[] }) | null
}

const formSchema = z.object({
	quantity: z.number(),
})

type QuantityFormValues = z.infer<typeof formSchema>

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
	const cart = useCart()

	const form = useForm<QuantityFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			quantity: 1,
		},
	})

	const submitFormHandler = async (data: QuantityFormValues) => {
		if (!product) {
			return null
		}

		const formattedPrice = product?.price.toString()

		const formattedItem: CartItem = {
			id: product.id,
			name: product.name,
			price: formattedPrice,
			description: product.description,
			images: product.images,
			quantity: data.quantity,
		}

		cart.addItem(formattedItem)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitFormHandler)}
				className="grid gap-4 sm:max-w-[240px]"
			>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									type="number"
									inputMode="numeric"
									min={0}
									{...field}
									onChange={(e) => {
										const value = e.target.value
										const parsedValue = parseInt(value, 10)
										if (isNaN(parsedValue)) return
										field.onChange(parsedValue)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
					Add to cart
					<span className="sr-only">Add to cart</span>
				</Button>
			</form>
		</Form>
	)
}

export default ProductActions
