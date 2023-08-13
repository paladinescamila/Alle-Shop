import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';

interface Props {
	product: Product;
	type?: 'cart' | 'order';
}

export default function OrderCard(props: Props) {
	const {product, type = 'cart'} = props;
	const {title, price, images} = product;
	const {removeFromCart} = useShoppingCartContext();

	return (
		<div className='grid grid-cols-[70px_1fr_20px] items-center mb-2 gap-2'>
			<figure>
				<img src={images[0]} alt={title} className='w-[70px] h-[70px] object-cover' />
			</figure>
			<p className='flex flex-col'>
				<span className='text-sm font-light'>{title}</span>
				<span className='text-lg font-medium'>${price}</span>
			</p>
			{type === 'cart' && (
				<XMarkIcon
					className='h-[20px] w-[20px] text-black/50 cursor-pointer ml-auto'
					onClick={() => removeFromCart(product)}
				/>
			)}
		</div>
	);
}
