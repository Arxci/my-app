'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { AspectRatio } from './ui/aspect-ratio'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Icons } from './icons'
import { formatter } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Card>
			<Link href={`/products/${product.id}`}>
				<CardHeader className="border-b p-0">
					<AspectRatio ratio={5 / 5}>
						{product?.images?.length ? (
							<Image
								src={product.images[0].url}
								alt={product.images[0]?.url ?? product.name}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								fill
								className="object-cover"
								loading="lazy"
							/>
						) : (
							<div
								aria-label="Placeholder"
								role="img"
								aria-roledescription="placeholder"
								className="flex h-full w-full items-center justify-center bg-secondary"
							>
								<Icons.placeholder
									className="h-9 w-9 text-muted-foreground"
									aria-hidden="true"
								/>
							</div>
						)}
					</AspectRatio>
				</CardHeader>
			</Link>
			<Link
				aria-label={`View ${product.name} details`}
				href={`/products/${product.id}`}
			>
				<CardContent className="grid gap-2.5 p-4">
					<CardTitle className="line-clamp-1">{product.name}</CardTitle>
					<CardDescription className="line-clamp-2">
						{formatter.format(Number(product.price))}
					</CardDescription>
				</CardContent>
			</Link>
			<CardFooter className="p-4">
				<div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
					<Link
						aria-label="Preview product"
						href={`/products/${product.id}`}
						className={buttonVariants({
							variant: 'outline',
							size: 'sm',
							className: 'h-8 w-full rounded-sm',
						})}
					>
						Preview
					</Link>
					<Button
						aria-label="Add to cart"
						size="sm"
						className="h-8 w-full rounded-sm"
						onClick={() => {}}
					>
						Add to cart
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default ProductCard
