'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CategoryCellAction } from './cell-actions'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
	id: string
	name: string
	createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <CategoryCellAction data={row.original} />,
	},
]
