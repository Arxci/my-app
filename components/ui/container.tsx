import { cn } from '@/lib/utils'

interface ContainerProps {
	children: React.ReactNode
	className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={cn('m-auto w-full container p-0', className)}>
			{children}
		</div>
	)
}

export default Container
