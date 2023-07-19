'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'
import { Icons } from '../icons'
import { AspectRatio } from './aspect-ratio'

interface ImageUploadProps {
	disabled?: boolean
	onChange: (value: string) => void
	onRemove: (value: string) => void
	value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const uploadHandler = (result: any) => {
		onChange(result.info.secure_url)
	}

	if (!isMounted) {
		return null
	}

	return (
		<div>
			<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4">
				{value.map((url) => (
					<AspectRatio
						ratio={0.75 / 1}
						key={url}
						className="relative rounded-md overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								size="icon"
								className="w-8 h-8"
								onClick={() => onRemove(url)}
								variant="destructive"
							>
								<Icons.trash className="w-4 h-4" />
							</Button>
						</div>
						<Image
							fill
							src={url}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
							alt="Image"
						/>
					</AspectRatio>
				))}
			</div>
			<CldUploadWidget
				onUpload={uploadHandler}
				uploadPreset="llgfuexr"
			>
				{({ open }) => {
					const onClick = () => {
						open()
					}

					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<Icons.imagePlus className="mr-2 h-4 w-4" />
							Upload an image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
