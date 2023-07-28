import { format } from 'date-fns'

import prismaDB from '@/lib/prisma'
import { OrderColumn, columns } from './components/column'
import Heading from '@/components/ui/heading'
import Container from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { formatter } from '@/lib/utils'

const OrdersPage = async () => {
	const orders = await prismaDB.order.findMany({
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedOrders: OrderColumn[] = orders.map((item) => {
		return {
			id: item.id,
			phone: item.phone,
			address: item.address,
			products: item.orderItems
				.map((orderItem) => orderItem.product.name)
				.join(', '),
			isPaid: item.isPaid,
			totalPrice: formatter.format(
				item.orderItems.reduce((total, item) => {
					return total + Number(item.product.price)
				}, 0)
			),
			createdAt: format(item.createdAt, 'MMMM do, yyyy'),
		}
	})

	return (
		<div className="flex-col px-4 sm:px-8">
			<Container>
				<div className="flex-1">
					<div className="flex flex-col gap-2 sm:items-center sm:flex-row py-6 justify-between">
						<Heading
							title={`Orders - ${formattedOrders.length}`}
							description="Manage orders for your store"
						/>
					</div>
					<Separator />

					<DataTable
						columns={columns}
						data={formattedOrders}
						searchKey="products"
					/>
				</div>
			</Container>
		</div>
	)
}

export default OrdersPage
