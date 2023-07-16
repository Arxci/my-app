import { format } from 'date-fns'

import prismaDB from '@/lib/prisma'
import { ProductsColumn, columns } from './components/column'
import { formatter } from '@/lib/utils'
import Heading from '@/components/ui/heading'
import ProductsActions from './components/actions'
import Container from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

const ProductsPage = async () => {
	const products = await prismaDB.product.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedProducts: ProductsColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		description: item.description,
		price: formatter.format(item.price.toNumber()),
		isFeatured: item.isFeatured,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}))

	return (
		<div className="flex-col px-4 sm:px-8">
			<Container>
				<div className="flex-1">
					<div className="flex items-center py-6 justify-between">
						<Heading
							title={`Products (${formattedProducts.length})`}
							description="Manage products for your store"
						/>
						<ProductsActions />
					</div>
					<Separator />
					<DataTable
						columns={columns}
						data={formattedProducts}
						searchKey="name"
					/>
				</div>
			</Container>
		</div>
	)
}

export default ProductsPage
