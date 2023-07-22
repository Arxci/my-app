import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

const ProductsFilter = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm">Filter</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-1">Filters</SheetHeader>
				<SheetDescription>
					Set your filters to narrow down your search
				</SheetDescription>
				<Separator className="my-6" />
			</SheetContent>
		</Sheet>
	)
}

export default ProductsFilter
