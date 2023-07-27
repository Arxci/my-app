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
					href: '/products',
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
					href: `/products/?category=${slugify(category.title)}`,
					description: `All ${category.title}.`,
					items: [],
				},
				...category.subcategories.map((subcategory) => ({
					title: subcategory.title,
					href: `/products/?category=${slugify(category.title)},${
						subcategory.slug
					}`,
					description: subcategory.description,
					items: [],
				})),
			],
		})),
	],
	footerNav: [
		...productCategories.map((category) => ({
			title: category.title,
			items: [
				{
					title: 'All',
					href: `/products/?category=${slugify(category.title)}`,
					external: false,
				},
				...category.subcategories.map((subcategory) => ({
					title: subcategory.title,
					href: `/products/?category=${slugify(category.title)},${
						subcategory.slug
					}`,
					external: false,
				})),
			],
		})),
		{
			title: 'Help',
			items: [
				{
					title: 'About',
					href: '/about',
					external: false,
				},
				{
					title: 'Contact',
					href: '/contact',
					external: false,
				},
				{
					title: 'Terms',
					href: '/terms',
					external: false,
				},
				{
					title: 'Privacy',
					href: '/privacy',
					external: false,
				},
			],
		},
	],
}
