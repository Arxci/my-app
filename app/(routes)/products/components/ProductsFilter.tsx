'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Category } from '@prisma/client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
	category: z.array(z.string()).optional(),
	priceRange: z.array(z.number()).optional(),
})

interface ProductsFilter {
	categories: Category[]
	currentFilters: string[]
	currentPrice: number[]
}

const ProductsFilter: React.FC<ProductsFilter> = ({
	categories,
	currentFilters,
	currentPrice,
}) => {
	const router = useRouter()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			category: [],
			priceRange: [0, 500],
		},
	})

	useEffect(() => {
		form.reset({
			category: currentFilters,
			priceRange: currentPrice,
		})
	}, [currentFilters, currentPrice])

	const submitFormHandler = (data: z.infer<typeof FormSchema>) => {
		let category = ''
		let priceRange = { min: 0, max: 500 }

		if (data.category) {
			category = data.category.join(',')
		}

		if (data.priceRange) {
			priceRange = { min: data.priceRange[0], max: data.priceRange[1] }
		}

		router.push(
			`/products?category=${category}&price=${priceRange.min},${priceRange.max}`
		)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm">Filter</Button>
			</SheetTrigger>
			<SheetContent className="flex w-full flex-col  sm:max-w-lg">
				<div>
					<SheetHeader>Filters</SheetHeader>
					<SheetDescription>
						Set your filters to narrow down your search
					</SheetDescription>
				</div>
				<Separator />

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitFormHandler)}
						className="flex flex-col h-full"
					>
						<ScrollArea className="h-full flex-1 ">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="text-base">Categories</FormLabel>
											<FormDescription>Filter by categories.</FormDescription>
										</div>

										{categories.map((cat) => (
											<FormField
												key={cat.id}
												control={form.control}
												name="category"
												render={() => (
													<FormItem>
														<FormControl>
															<div className="flex items-center space-x-2">
																<Checkbox
																	checked={field.value?.includes(cat.name)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...(field.value || []),
																					cat.name,
																			  ])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== cat.name
																					)
																			  )
																	}}
																	id={cat.name}
																/>
																<Label htmlFor={cat.name}>{cat.name}</Label>
															</div>
														</FormControl>
													</FormItem>
												)}
											/>
										))}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="priceRange"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col justify-center space-y-2 py-4">
											<div className="mb-4">
												<FormLabel
													htmlFor="price"
													className="text-base"
												>
													Price ($)
												</FormLabel>
												<FormDescription>Filter by price.</FormDescription>
											</div>
											<FormControl>
												<div className="space-y-4">
													<Slider
														variant="range"
														thickness="thin"
														defaultValue={[0, 500]}
														max={500}
														step={1}
														value={field.value}
														onValueChange={(value: number[]) => {
															field.onChange(value)
														}}
													/>

													<div className="flex items-center space-x-4">
														<Input
															type="number"
															inputMode="numeric"
															min={0}
															max={field.value ? field.value[1] : 500}
															className="h-9"
															value={field.value ? field.value[0] : 0}
															onChange={(e) => {
																const value = Number(e.target.value)
																field.onChange([
																	value,
																	field.value ? field.value[1] : 500,
																])
															}}
														/>
														<span className="text-muted-foreground">-</span>
														<Input
															type="number"
															inputMode="numeric"
															min={field.value ? field.value[0] : 0}
															max={500}
															className="h-9"
															value={field.value ? field.value[1] : 500}
															onChange={(e) => {
																const value = Number(e.target.value)
																field.onChange([
																	field.value ? field.value[0] : 0,
																	value,
																])
															}}
														/>
													</div>
												</div>
											</FormControl>
										</div>
									</FormItem>
								)}
							/>
						</ScrollArea>
						<SheetFooter className="py-6 ">
							<Button
								type="submit"
								variant="default"
								size="lg"
								className="w-full"
							>
								Submit
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default ProductsFilter
