import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { formatter } from '@/lib/utils'
import {
	getGraphRevenue,
	getSalesCount,
	getStockCount,
	getTotalRevenue,
} from '@/lib/dashboard'
import Overview from '@/components/overview'

const DashboardPage = async () => {
	const totalRevenue = await getTotalRevenue()
	const salesCount = await getSalesCount()
	const stockCount = await getStockCount()
	const graphRevenue = await getGraphRevenue()

	return (
		<div className="flex-col px-4 sm:px-8">
			<Container>
				<div className="flex-col pb-6">
					<div className="flex-1 space-y-4 pt-6">
						<Heading
							title="Dashboard"
							description="Overview of the store"
						/>
						<Separator />
						<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Revenue
									</CardTitle>

									<Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{formatter.format(totalRevenue)}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Sales</CardTitle>

									<Icons.creditCard className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">+{salesCount}</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Products In Stock
									</CardTitle>

									<Icons.product className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stockCount}</div>
								</CardContent>
							</Card>
						</div>
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Overview</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<Overview data={graphRevenue} />
							</CardContent>
						</Card>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default DashboardPage
