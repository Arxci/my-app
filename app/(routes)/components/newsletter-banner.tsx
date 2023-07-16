import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const NewsletterBanner = () => {
	return (
		<div className="relative h-[500px] md:h-[300px] flex items-end bg-black">
			<Image
				src={'/NewsletterLogo.webp'}
				alt="Newsletter"
				fill
				className="object-cover hidden md:flex"
			/>
			<Image
				src={'/NewsletterLogoMobile.webp'}
				alt="Newsletter"
				fill
				className="object-cover  md:hidden"
				style={{ objectPosition: '30% 20%' }}
			/>
			<div className="absolute flex flex-col gap-2 lg:h-full w-full md:w-[400px] p-4 lg:p-8 ">
				<h2 className="text-white text-5xl font-black">Join Our Newsletter</h2>
				<div className="mt-10 md:mt-auto flex gap-2 flex-col md:flex-row">
					<Input
						type="email"
						placeholder="Email"
					/>
					<Button
						variant="outline"
						className="bg-black text-white"
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	)
}

export default NewsletterBanner
