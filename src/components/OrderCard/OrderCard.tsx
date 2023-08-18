import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShopiContext} from '../../context';

interface Props {
	product: Product;
	type?: 'cart' | 'order';
}

export default function OrderCard(props: Props) {
	const {product, type = 'cart'} = props;
	const {title, price, image} = product;
	const {removeFromCart} = useShopiContext();

	return (
		<div className='grid grid-cols-[70px_1fr_20px] items-center mb-2 gap-2'>
			<figure className='w-[70px] h-[70px] flex items-center justify-center p-1'>
				<img src={image} alt={title} className='max-w-full max-h-full' />
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
