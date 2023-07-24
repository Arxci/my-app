import Banner from '@/components/ui/banner'
import Container from '@/components/ui/container'
import BannerActions from './components/banner-actions'
import CategoryGallery from './components/category-gallery'
import NewsletterBanner from './components/newsletter-banner'
import FavoritesShowcase from './components/favorites-showcase'
import getProducts from '@/actions/get-products'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const HomePage = async () => {
	const featuredProducts = await getProducts({ isFeatured: true })

	return (
		<div>
			<Container>
				<Banner
					image={'/HomePageBanner.webp'}
					heading="Nike: Unleash Your Winning Potential!"
					subtext="Experience a one-stop destination for top-quality athletic gear, apparel, and accessories. Unleash your potential today!"
					actions={<BannerActions />}
				/>
				<div className="text-center mt-72 flex flex-col gap-4 px-4 sm:px-8">
					<h2 className=" text-5xl font-bold">Categories</h2>
					<p className="text-lg text-muted-foreground font-normal">
						Explore our categories and find the best products for you
					</p>
					<CategoryGallery />
				</div>
				<div className="my-20">
					<NewsletterBanner />
				</div>
				<div className="my-20  text-center flex flex-col gap-4 px-4 sm:px-8">
					<div className="flex flex-col md:flex-row md:justify-between md:items-center text-left">
						<div>
							<h2 className=" text-5xl font-bold">Favorites</h2>
							<p className="text-lg text-muted-foreground font-normal">
								Heres some of our favorites
							</p>
						</div>
						<Link
							href={'/products'}
							className={buttonVariants({
								variant: 'default',
								size: 'lg',
							})}
						>
							View All
						</Link>
					</div>

					<FavoritesShowcase favorites={featuredProducts.data} />
				</div>
			</Container>
		</div>
	)
}

export default HomePage
