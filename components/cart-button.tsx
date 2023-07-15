import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

const CartButton = () => {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						aria-label="Cart"
						className="relative"
						variant="outline"
						size="icon"
					>
						<Icons.cart
							className="h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Cart</SheetTitle>
						<SheetDescription>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
							commodi? Ullam dicta dolorum ipsa, cupiditate vero perspiciatis
							delectus aliquid officia!
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default CartButton
