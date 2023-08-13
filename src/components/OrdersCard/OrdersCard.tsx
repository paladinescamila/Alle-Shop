import {getTotalPrice} from '../../utils';
import {ChevronRightIcon} from '@heroicons/react/24/solid';

interface Props {
	order: Order;
}

export default function OrdersCard(props: Props) {
	const {date, products} = props.order;
	const totalPrice = getTotalPrice(products);
	const totalProducts = products.length;

	return (
		<div className='flex justify-between items-center mb-3 border border-black w-80 p-4 hover:bg-gray-100 transition-colors duration-100'>
			<p className='flex flex-col'>
				<span className='font-light'>{date.toLocaleDateString()}</span>
				<span className='font-light'>
					{totalProducts} product{totalProducts > 1 ? 's' : ''}
				</span>
			</p>
			<p className='flex items-center gap-2'>
				<span className='font-medium text-2xl'>${totalPrice.toLocaleString()}</span>
				<ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
			</p>
		</div>
	);
}
