import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const BannerActions = () => {
	return (
		<div className="flex items-center gap-4">
			<Link
				href={'/products'}
				className={buttonVariants({
					variant: 'default',
					size: 'lg',
				})}
			>
				Shop Now
			</Link>
		</div>
	)
}

export default BannerActions
