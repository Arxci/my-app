'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from './ui/badge'
import useCart from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import Image from 'next/image'
import { formatter } from '@/lib/utils'
import UpdateCartItem from './update-cart-item'

const CartButton = () => {
	const [mounted, setMounted] = useState(false)
	const cart = useCart()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	const itemCount = cart.items.reduce(
		(total, item) => total + Number(item.quantity),
		0
	)

	const cartTotal = cart.items.reduce(
		(total, item) => total + Number(item.quantity) * Number(item.price),
		0
	)

	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						aria-label="Cart"
						className="relative"
						variant="outline"
						size="icon"
					>
						{itemCount > 0 && (
							<Badge
								variant="default"
								className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2 flex items-center justify-center"
							>
								{itemCount}
							</Badge>
						)}

						<Icons.cart
							className="h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				</SheetTrigger>
				<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
					<SheetHeader className="px-1">
						<SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
					</SheetHeader>
					<Separator />
					{itemCount > 0 ? (
						<>
							<div className="flex flex-1 flex-col gap-5 overflow-hidden">
								<ScrollArea className="h-full">
									<div className="flex flex-col gap-5 pr-6">
										{cart.items.map((item) => (
											<div
												key={item.id}
												className="space-y-3"
											>
												<div className="flex items-center space-x-4">
													<div className="relative h-16 w-16 overflow-hidden rounded">
														{item?.images?.length ? (
															<Image
																src={item.images[0].url}
																alt={item.images[0]?.url ?? item.name}
																sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
																fill
																className="absolute object-cover"
																loading="lazy"
															/>
														) : (
															<div className="flex h-full items-center justify-center bg-secondary">
																<Icons.placeholder
																	className="h-4 w-4 text-muted-foreground"
																	aria-hidden="true"
																/>
															</div>
														)}
													</div>
													<div className="flex flex-1 flex-col gap-1 self-start text-sm">
														<span className="line-clamp-1">{item.name}</span>
														<span className="line-clamp-1 text-muted-foreground">
															{formatter.format(
																Number(item.price) * Number(item.quantity)
															)}
														</span>
														<span className="line-clamp-1 text-xs capitalize text-muted-foreground">
															quantity: {item.quantity}
														</span>
													</div>
													<UpdateCartItem item={item} />
												</div>
												<Separator />
											</div>
										))}
									</div>
								</ScrollArea>
							</div>
							<div className="grid gap-1.5 pr-6 text-sm">
								<Separator className="mb-2" />
								<div className="flex">
									<span className="flex-1">Subtotal</span>
									<span>{formatter.format(Number(cartTotal.toFixed(2)))}</span>
								</div>
								<div className="flex">
									<span className="flex-1">Shipping</span>
									<span>Free</span>
								</div>
								<div className="flex">
									<span className="flex-1">Taxes</span>
									<span>Calculated at checkout</span>
								</div>
								<Separator className="mt-2" />
								<div className="flex">
									<span className="flex-1">Total</span>
									<span>{formatter.format(Number(cartTotal.toFixed(2)))}</span>
								</div>
								<SheetFooter className="mt-1.5">
									<Button
										aria-label="Proceed to checkout"
										size="sm"
										className="w-full"
									>
										Proceed to Checkout
									</Button>
								</SheetFooter>
							</div>
						</>
					) : (
						<div className="flex h-full flex-col items-center justify-center space-y-2">
							<Icons.cart
								className="h-12 w-12 text-muted-foreground"
								aria-hidden="true"
							/>
							<span className="text-lg font-medium text-muted-foreground">
								Your cart is empty
							</span>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}

export default CartButton
