import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { CartItem } from '@/types'
import { toast } from 'sonner'

interface CartStore {
	items: CartItem[]
	addItem: (data: CartItem) => void
	removeItem: (id: string, quantity: number) => void
	updateQuantity: (id: string, quantity: number) => void
	removeAll: () => void
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addItem: (data: CartItem) => {
				const currentItems = get().items
				const existingItem = currentItems.find((item) => item.id === data.id)
				let updatedItems: CartItem[]

				if (existingItem) {
					const updatedItem: CartItem = {
						...existingItem,
						quantity: existingItem?.quantity + data.quantity,
					}
					updatedItems = currentItems
					const itemIndex = currentItems.findIndex(
						(item) => item.id === data.id
					)
					updatedItems[itemIndex] = updatedItem
				} else {
					updatedItems = [...get().items, data]
				}

				set({ items: updatedItems })
				toast.success(`${data?.name} added to cart`)
			},
			removeItem: (id: string, quantity: number) => {
				const currentItems = get().items
				const existingItem = currentItems.find((item) => item.id === id)
				let updatedItems: CartItem[]

				if (!existingItem) {
					return
				}

				if (existingItem?.quantity - quantity < 1) {
					updatedItems = currentItems.filter((item) => item.id !== id)
				} else {
					const updatedItem: CartItem = {
						...existingItem,
						quantity: existingItem?.quantity - quantity,
					}

					updatedItems = currentItems
					const itemIndex = currentItems.findIndex((item) => item.id === id)
					updatedItems[itemIndex] = updatedItem
				}

				set({ items: updatedItems })
				toast.success(`${existingItem?.name} removed from cart`)
			},
			updateQuantity: (id: string, quantity: number) => {
				const currentItems = get().items
				const existingItem = currentItems.find((item) => item.id === id)
				let updatedItems: CartItem[]

				if (!existingItem) {
					return
				}

				if (quantity < 1) {
					updatedItems = currentItems.filter((item) => item.id !== id)
				} else {
					const updatedItem: CartItem = {
						...existingItem,
						quantity: quantity,
					}

					updatedItems = currentItems
					const itemIndex = currentItems.findIndex((item) => item.id === id)
					updatedItems[itemIndex] = updatedItem
				}

				set({ items: updatedItems })
			},
			removeAll: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export default useCart
