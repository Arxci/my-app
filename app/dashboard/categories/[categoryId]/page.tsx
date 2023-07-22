import CategoryForm from '@/components/forms/category-form'
import Container from '@/components/ui/container'
import prismaDB from '@/lib/prisma'

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
	const { categoryId } = params
	const category = await prismaDB.category.findUnique({
		where: {
			id: categoryId,
		},
	})

	return (
		<div className="flex-col px-4 sm:px-8 pb-6">
			<Container>
				<div className="flex-1 ">
					<CategoryForm initialData={category} />
				</div>
			</Container>
		</div>
	)
}

export default CategoryPage
