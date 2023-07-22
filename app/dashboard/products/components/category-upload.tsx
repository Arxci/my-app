'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Icons } from '@/components/icons'
import { toast } from 'sonner'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import { Category } from '@prisma/client'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

interface CategoryUploadProps {
	disabled?: boolean
	onChange: (value: string) => void
	onRemove: (value: string) => void
	value: string[]
	categories: Category[]
}

const CategoryUpload: React.FC<CategoryUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
	categories,
}) => {
	const [open, setOpen] = useState(false)

	const uploadHandler = (id: string) => {
		if (!value.includes(id)) {
			onChange(id)
			toast.success('Category added to product')
		} else {
			toast.error('Category already added to product')
		}
	}

	const removeHandler = (id: string) => {
		onRemove(id)
		toast.success('Removed category from product')
	}

	const formattedValues = value.map((val) => {
		const newVal = categories.filter((cat) => cat.id === val)[0]
		return { name: newVal.name, id: newVal.id }
	})

	return (
		<div className="w-full ">
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						disabled={disabled}
						aria-expanded={open}
						className="w-full justify-between"
					>
						Add a category
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start">
					<Command className="">
						<CommandInput placeholder="Search for categories" />
						<CommandEmpty>No categories found</CommandEmpty>
						<CommandGroup heading="Categories">
							<ScrollArea className="h-[150px]">
								{categories.map((category) => (
									<CommandItem
										key={category.id}
										onSelect={() => {
											uploadHandler(category.id)
											setOpen(false)
										}}
									>
										{category.name}
									</CommandItem>
								))}
							</ScrollArea>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>

			<ScrollArea className="flex-1 h-[150px] ">
				<div className="flex flex-col gap-2">
					{formattedValues?.map((category) => (
						<div
							key={category.id}
							className="border-b items-center w-full flex justify-between p-4 align-middle gap-2"
						>
							{category.name}
							<Button
								type="button"
								size="icon"
								variant="destructive"
								onClick={() => removeHandler(category.id)}
							>
								<Icons.trash className="w-4 h-4" />
							</Button>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default CategoryUpload
