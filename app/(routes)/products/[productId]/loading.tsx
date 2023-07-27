import { Icons } from '@/components/icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Container from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingTest = () => {
	return (
		<div className="px-4 sm:px-8 mb-6">
			<Container className=" ">
				<nav
					className="flex gap-2 items-center my-8"
					aria-label="breadcrumbs"
				>
					<Skeleton className="w-40 h-8" />
				</nav>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 ">
					<AspectRatio ratio={3 / 3}>
						<Skeleton className="flex h-full w-full items-center justify-center" />
					</AspectRatio>
					<div className="flex-1 p-6">
						<div className=" flex flex-col gap-4">
							<Skeleton className="h-8 w-60" />
							<Skeleton className="h-8 w-20" />
						</div>
						<Separator className="my-6" />
						<div className="flex flex-col gap-2">
							<Skeleton className="h-8 w-20" />
							<Skeleton className="h-8 w-60" />
							<Skeleton className="h-8 w-60" />
						</div>
						<Separator className="my-6" />
						<div className="flex flex-col gap-2">
							<Skeleton className="h-[100px] w-full" />
							<Skeleton className="h-[40px] w-full" />
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default LoadingTest
