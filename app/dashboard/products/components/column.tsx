'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ProductCellAction } from './cell-actions'

import { Category } from '@prisma/client'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
	id: string
	name: string
	description: string
	price: string
	isFeatured: string
	categories: Category[]
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
		accessorKey: 'categories',
		header: 'Categories',
		cell: ({ row }) => <div>{`${row.original?.categories[0]?.name}...`}</div>,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<div className="flex justify-end ">
				<ProductCellAction data={row.original} />
			</div>
		),
	},
]
