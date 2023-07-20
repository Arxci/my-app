import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { CartItem } from '@/types'
import { toast } from 'sonner'

interface CartStore {
	items: CartItem[]
	addItem: (data: CartItem) => void
	removeItem: (id: string) => void
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
						quantity: existingItem?.quantity + 1,
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
				console.log(get().items)
			},
			removeItem: (id: string) => {
				const currentItems = get().items
				const existingItem = currentItems.find((item) => item.id === id)
				let updatedItems: CartItem[]

				if (!existingItem) {
					return
				}

				if (existingItem?.quantity <= 1) {
					updatedItems = currentItems.filter((item) => item.id !== id)
				} else {
					const updatedItem: CartItem = {
						...existingItem,
						quantity: existingItem?.quantity - 1,
					}

					updatedItems = currentItems
					const itemIndex = currentItems.findIndex((item) => item.id === id)
					updatedItems[itemIndex] = updatedItem
				}

				set({ items: updatedItems })
				toast.success(`${existingItem?.name} removed from cart`)
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
