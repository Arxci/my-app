import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Product, Image, Category } from '@prisma/client'
import Link from 'next/link'
import { productCategories } from '@/config/products'

interface BreadcrumbsProps {
	product: (Product & { images: Image[]; categories: Category[] }) | null
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
	if (!product) {
		return null
	}

	const category = productCategories.filter((category) => {
		let checker = (arr: string[], target: string[]) =>
			target.every((v) => arr.includes(v))
		const names = product?.categories?.map((cat) => cat.name)

		console.log([category.title.toLowerCase()])
		return checker(names, [category.title.toLowerCase()])
	})

	console.log(category)

	return (
		<nav
			className="flex gap-2 items-center my-8"
			aria-label="breadcrumbs"
		>
			<BreadcrumbItem
				name={category[0].title}
				className="font-bold"
			/>
			<Icons.chevronRight className="h-4 w-4 text-muted-foreground" />

			<BreadcrumbItem
				id={product?.id}
				name={product?.name}
				disabled={true}
				className="text-muted-foreground "
			/>
		</nav>
	)
}

export default Breadcrumbs

interface BreadcrumbItemProps {
	name: string
	id?: string
	className?: string
	disabled?: boolean
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
	name,
	id = 0,
	className,
	disabled,
}) => {
	const formattedName =
		name.substring(0, 1).toUpperCase() + name.substring(1) + ''

	if (disabled) {
		return (
			<div
				key={id}
				className={cn('text-sm ', className)}
			>
				{formattedName}
			</div>
		)
	}

	return (
		<div key={id}>
			<Link
				href={`/products?category=${name}`}
				className={cn(
					'text-sm hover:text-muted-foreground transition-colors',
					className
				)}
			>
				{formattedName}
			</Link>
		</div>
	)
}
