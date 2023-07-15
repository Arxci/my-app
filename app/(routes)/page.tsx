import Banner from '@/components/ui/banner'
import Container from '@/components/ui/container'
import BannerActions from './components/banner-actions'

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
			</Container>
		</div>
	)
}

export default HomePage
