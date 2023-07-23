'use client'

import useCart from '@/hooks/use-cart'
import { CartItem } from '@/types'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { Input } from '../ui/input'
import { ChangeEventHandler } from 'react'

interface UpdateCartItemProps {
	item: CartItem
}

const UpdateCartItem: React.FC<UpdateCartItemProps> = ({ item }) => {
	const cart = useCart()

	const increaseQuantityHandler = (amount: number) => {
		cart.addItem({ ...item, quantity: amount })
	}

	const decreaseQuantityHandler = (amount: number) => {
		cart.removeItem(item.id, amount)
	}

	const updateQuantityHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log(Number(e.target.value))
		cart.updateQuantity(item.id, Number(e.target.value))
	}

	const removeItemHandler = () => {
		cart.removeItem(item.id, item.quantity)
	}

	return (
		<div className="flex ml-auto sm:ml-0 items-center space-x-1">
			<div className="flex items-center space-x-1">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => decreaseQuantityHandler(1)}
				>
					<Icons.remove
						className="h-3 w-3"
						aria-hidden="true"
					/>
					<span className="sr-only">Remove one item</span>
				</Button>
				<Input
					type="number"
					id="quantity"
					min="0"
					className="h-8 w-14"
					value={item.quantity}
					onChange={(e) => updateQuantityHandler(e)}
				/>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					onClick={() => increaseQuantityHandler(1)}
				>
					<Icons.add
						className="h-3 w-3"
						aria-hidden="true"
					/>
					<span className="sr-only">Add one item</span>
				</Button>
			</div>
			<Button
				variant="outline"
				size="icon"
				className="h-8 w-8"
				onClick={removeItemHandler}
			>
				<Icons.trash
					className="h-3 w-3"
					aria-hidden="true"
				/>
				<span className="sr-only">Delete item</span>
			</Button>
		</div>
	)
}

export default UpdateCartItem
