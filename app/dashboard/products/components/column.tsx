'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
	id: string
	name: string
	description: string
	price: string
	isFeatured: boolean
	createdAt: string
}

export const columns: ColumnDef<ProductsColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'isFeatured',
		header: 'IsFeatured',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <></>,
	},
]
