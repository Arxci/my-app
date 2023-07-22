import { format } from 'date-fns'

import prismaDB from '@/lib/prisma'
import { CategoryColumn, columns } from './components/column'
import Heading from '@/components/ui/heading'
import CategoriesActions from './components/actions'
import Container from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

const CategoriesPage = async () => {
	const categories = await prismaDB.category.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedCategories: CategoryColumn[] = categories.map((item) => {
		return {
			id: item.id,
			name: item.name,
			createdAt: format(item.createdAt, 'MMMM do, yyyy'),
		}
	})

	return (
		<div className="flex-col px-4 sm:px-8">
			<Container>
				<div className="flex-1">
					<div className="flex flex-col gap-2 sm:items-center sm:flex-row py-6 justify-between">
						<Heading
							title={`Categories`}
							description="Manage categories for your store"
						/>
						<CategoriesActions />
					</div>
					<Separator />

					<DataTable
						columns={columns}
						data={formattedCategories}
						searchKey="name"
					/>
				</div>
			</Container>
		</div>
	)
}

export default CategoriesPage
