import Banner from '@/components/ui/banner'
import Container from '@/components/ui/container'
import BannerActions from './components/banner-actions'
import CategoryGallery from './components/category-gallery'
import NewsletterBanner from './components/newsletter-banner'

const HomePage = () => {
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
			</Container>
		</div>
	)
}

export default HomePage
