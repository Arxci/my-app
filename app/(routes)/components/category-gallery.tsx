import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'

const DUMMY_CARDS = [
	{
		id: 0,
		label: 'Latest in basketball',
		url: '/products?category=basketball',
		image: '/CategoryGallery01.webp',
	},
	{
		id: 1,
		label: 'Clothing',
		url: '/products?category=clothing',
		image: '/CategoryGallery02.webp',
	},
	{
		id: 2,
		label: 'Soccer Essentials',
		url: '/products?category=soccer',
		image: '/CategoryGallery03.webp',
	},
	{
		id: 3,
		label: 'Gear for the Gridiron',
		url: '/products?category=football',
		image: '/CategoryGallery04.webp',
	},
]

const CategoryGallery = () => {
	return (
		<div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
			{DUMMY_CARDS.map((card) => (
				<CategoryCard
					key={card.id}
					label={card.label}
					url={card.url}
					image={card.image}
				/>
			))}
		</div>
	)
}

interface CategoryCardProps {
	image: string
	url: string
	label: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, url, label }) => {
	return (
		<Link
			aria-label={`Go to ${label}`}
			key={label}
			href={url}
		>
			<div className="group relative overflow-hidden rounded-md">
				<AspectRatio ratio={4 / 5}>
					<div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
					<Image
						src={image}
						alt={label}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover transition-transform group-hover:scale-105"
						priority
					/>
				</AspectRatio>
				<div className="absolute inset-0 z-20 flex items-center justify-center">
					<h3 className="text-xl font-medium capitalize text-slate-100 md:text-2xl">
						{label}
					</h3>
				</div>
			</div>
		</Link>
	)
}

export default CategoryGallery
