import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'

export const siteConfig = {
	name: 'Shoe Store',
	description: 'An open source e-commerce shoe store built in Next.js 13.',
	mainNav: [
		{
			title: 'Lobby',
			items: [
				{
					title: 'Products',
					href: '/products',
					description: 'All the products we have to offer.',
					items: [],
				},
				{
					title: 'Build a Board',
					href: '/build-a-board',
					description: 'Build your own custom skateboard.',
					items: [],
				},
				{
					title: 'Blog',
					href: '/blog',
					description: 'Read our latest blog posts.',
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
