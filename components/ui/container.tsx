interface ContainerProps {
	children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className="m-auto w-full max-w-7xl px-1 lg:px-2">{children}</div>
}

export default Container
