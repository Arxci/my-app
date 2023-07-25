import Container from '@/components/ui/container'
import prismaDB from '@/lib/prisma'
import Breadcrumbs from './components/breadcrumbs'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Icons } from '@/components/icons'
import { formatter } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import ProductActions from './components/product-actions'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const { productId } = params
	const product = await prismaDB.product.findFirst({
		where: {
			id: productId,
		},
		include: {
			images: true,
			categories: true,
		},
	})

	return (
		<div className="px-4 sm:px-8 mb-6">
			<Container className=" ">
				<Breadcrumbs product={product} />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 ">
					<AspectRatio ratio={3 / 3}>
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
					<div className="flex-1 p-6">
						<div className=" flex flex-col gap-4">
							<h2 className="font-bold text-lg">{product?.name}</h2>
							<p className="text-muted-foreground">
								{formatter.format(Number(product?.price))}
							</p>
						</div>
						<Separator className="my-6" />
						<ProductActions product={product} />
						<Separator className="my-6" />
						<Accordion
							type="single"
							collapsible
							defaultValue="description"
						>
							<AccordionItem
								value="description"
								className="my-2"
							>
								<AccordionTrigger>Description</AccordionTrigger>
								<AccordionContent>{product?.description}</AccordionContent>
							</AccordionItem>
							<AccordionItem
								value="return-policy"
								className="my-2"
							>
								<AccordionTrigger>Return Policy</AccordionTrigger>
								<AccordionContent>
									We offer a hassle-free return process within 30 days of
									purchase. Items must be in original condition with tags
									attached. Customers are responsible for return shipping costs.
									Refunds are issued within 5 business days of receipt.
									Exceptions: perishables, personalized items, and final sale
									products. Contact our support for assistance.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default ProductPage
