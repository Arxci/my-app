import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Product, Image, Category } from '@prisma/client'
import Link from 'next/link'

interface BreadcrumbsProps {
	product: (Product & { images: Image[]; categories: Category[] }) | null
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
	if (!product) {
		return null
	}

	return (
		<nav
			className="flex gap-2 items-center my-8"
			aria-label="breadcrumbs"
		>
			{product?.categories?.map((cat) => (
				<>
					<BreadcrumbItem
						id={cat.id}
						name={cat.name}
						className="font-bold"
					/>
					<Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
				</>
			))}
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
	id: string
	className?: string
	disabled?: boolean
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
	name,
	id,
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
