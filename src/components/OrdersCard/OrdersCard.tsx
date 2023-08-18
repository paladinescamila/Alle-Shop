import {getTotalPrice} from '../../utils';
import {ChevronRightIcon} from '@heroicons/react/24/solid';

interface Props {
	order: Order;
}

export default function OrdersCard(props: Props) {
	const {date, products} = props.order;
	const totalPrice = getTotalPrice(products.map((i) => i.product));
	const totalProducts = products.length;

	return (
		<div className='flex justify-between items-center mb-3 border border-black/20 w-80 p-4 hover:border-black transition-colors duration-300 group'>
			<p className='flex flex-col'>
				<span className='font-light'>{date.toLocaleDateString()}</span>
				<span className='font-light'>
					{totalProducts} product{totalProducts > 1 ? 's' : ''}
				</span>
			</p>
			<p className='flex items-center gap-2'>
				<span className='font-medium text-2xl'>${totalPrice.toLocaleString()}</span>
				<ChevronRightIcon
					className={`h-6 w-6 text-black/30 group-hover:text-black cursor-pointer transition-colors duration-300`}
				/>
			</p>
		</div>
	);
}
