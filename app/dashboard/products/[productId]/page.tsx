import ProductForm from '@/components/forms/product-form'
import Container from '@/components/ui/container'
import prismaDB from '@/lib/prisma'

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const { productId } = params
	const product = await prismaDB.product.findUnique({
		where: {
			id: productId,
		},
		include: {
			images: true,
			categories: true,
		},
	})

	const categories = await prismaDB.category.findMany()

	return (
		<div className="flex-col px-4 sm:px-8 pb-6">
			<Container>
				<div className="flex-1 ">
					<ProductForm
						initialData={product}
						categories={categories}
					/>
				</div>
			</Container>
		</div>
	)
}

export default ProductPage
