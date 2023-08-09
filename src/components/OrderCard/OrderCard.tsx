import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';

interface Props {
	data: Card;
}

export default function OrderCard(props: Props) {
	const {title, price, images} = props.data;
	const {removeFromCart} = useShoppingCartContext();

	return (
		<div className='flex justify-between items-center mb-2'>
			<div className='flex items-center gap-2'>
				<figure className='w-20 h-20'>
					<img src={images[0]} alt={title} className='w-full h-full rounded-lg object-cover' />
				</figure>
				<p className='text-sm font-light'>{title}</p>
			</div>
			<div className='flex items-center gap-2'>
				<p className='text-lg font-medium'>${price}</p>
				<XMarkIcon
					className='h-6 w-6 text-black cursor-pointer'
					onClick={() => removeFromCart(props.data)}
				/>
			</div>
		</div>
	);
}
