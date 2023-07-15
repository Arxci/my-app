import Image from 'next/image'

import { cn } from '@/lib/utils'

interface BannerProps {
	image: string
	heading?: string
	subtext?: string
	actions?: React.ReactNode
	className?: string
}

const Banner: React.FC<BannerProps> = ({
	className,
	image,
	heading,
	subtext,
	actions,
}) => {
	return (
		<section className={cn('h-[500px] w-full relative', className)}>
			<div className="relative w-full h-full">
				<Image
					src={image}
					alt=""
					fill
					className="object-cover object-top"
				/>
			</div>
			<div className="absolute w-full h-full bg-black bg-opacity-60 top-0 flex items-center justify-center flex-col gap-4 px-2 lg:px-4 text-center">
				<h1 className="text-2xl lg:text-6xl font-semibold text-white ">
					{heading}
				</h1>
				<p className="text-sm lg:text-lg max-w-xl text-white opacity-80">
					{subtext}
				</p>
				{actions}
			</div>
		</section>
	)
}

export default Banner
