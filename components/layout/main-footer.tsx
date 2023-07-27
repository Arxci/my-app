import { siteConfig } from '@/config/site'
import Container from '../ui/container'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const MainFooter = () => {
	return (
		<footer className="mt-auto   px-4 sm:px-8 bg-black text-white">
			<Container className="py-10">
				<section
					id="footer-content"
					aria-labelledby="footer-content-heading"
					className="flex flex-col gap-10 lg:flex-row lg:gap-20"
				>
					<section
						id="footer-branding"
						aria-labelledby="footer-branding-heading"
					>
						<Link
							aria-label="Home"
							href="/"
							className="flex items-center space-x-2"
						>
							<span className="font-bold">{siteConfig.name}</span>
						</Link>
					</section>
					<section
						id="footer-links"
						aria-labelledby="footer-links-heading"
						className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4"
					>
						{siteConfig.footerNav.map((item) => (
							<div
								key={item.title}
								className="space-y-3 "
							>
								<h4 className="text-base font-bold">{item.title}</h4>
								<ul className="space-y-3">
									{item.items.map((link) => (
										<li key={link.title}>
											<Link
												href={link.href}
												target={link?.external ? '_blank' : undefined}
												rel={link?.external ? 'noreferrer' : undefined}
												className="text-sm font-light text-muted transition-colors hover:text-muted-foreground"
											>
												{link.title}
												<span className="sr-only">{link.title}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</section>
					<section
						id="newsletter"
						aria-labelledby="newsletter-heading"
						className="space-y-3"
					>
						<h4 className="text-base text-left font-bold">
							Subscribe to our newsletter
						</h4>
						<div className="flex items-center gap-2">
							<Input placeholder="Email" />
							<Button variant="secondary">Submit</Button>
						</div>
					</section>
				</section>
			</Container>
		</footer>
	)
}

export default MainFooter
