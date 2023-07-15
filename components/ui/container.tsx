interface ContainerProps {
	children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className="m-auto w-full container px-0">{children}</div>
}

export default Container
