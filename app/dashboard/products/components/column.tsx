'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ProductCellAction } from './cell-actions'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
	id: string
	name: string
	description: string
	price: string
	isFeatured: string
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
		header: 'Featured',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ProductCellAction data={row.original} />,
	},
]
