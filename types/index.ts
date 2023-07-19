import { type Icons } from '@/components/icons'
import { Image } from '@prisma/client'

export interface NavItem {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
	label?: string
	description?: string
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export interface Product {
	id: string
	name: string
	price: string
	isFeatured: boolean
	images: Image[]
}
