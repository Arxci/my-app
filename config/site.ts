import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'

export const siteConfig = {
	name: 'Nike',
	description:
		'Discover top-notch athletic gear and fashion at our premier sports emporium.',
	navDesktop: [
		{
			title: 'Home',
			items: [
				{
					title: 'Products',
					href: '/',
					description: 'All the products we have to offer.',
					items: [],
				},
				{
					title: 'On Sale',
					href: '/',
					description: 'View all of our on sale products.',
					items: [],
				},
				{
					title: 'Features',
					href: '/',
					description: 'Check out some of our favorites!',
					items: [],
				},
			],
		},
		...productCategories.map((category) => ({
			title: category.title,
			items: [
				{
					title: 'All',
					href: `/categories/${slugify(category.title)}`,
					description: `All ${category.title}.`,
					items: [],
				},
				...category.subcategories.map((subcategory) => ({
					title: subcategory.title,
					href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
					description: subcategory.description,
					items: [],
				})),
			],
		})),
	],
}
