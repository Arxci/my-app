'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from './ui/badge'
import useCart from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

const CartButton = () => {
	const [mounted, setMounted] = useState(false)
	const cart = useCart()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

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
						<Badge
							variant="default"
							className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2 flex items-center justify-center"
						>
							{cart.items.length}
						</Badge>
						<Icons.cart
							className="h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				</SheetTrigger>
				<SheetContent className="w-full">
					<SheetHeader>
						<SheetTitle>Cart</SheetTitle>
						<SheetDescription>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
							commodi? Ullam dicta dolorum ipsa, cupiditate vero perspiciatis
							delectus aliquid officia!
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default CartButton
