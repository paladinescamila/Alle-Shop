import {TrashIcon, PlusIcon, MinusIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {useShopiContext} from '../../context';

interface Props {
	product: Product;
	quantity: number;
	type?: 'cart' | 'order';
}

export default function OrderCard(props: Props) {
	const {changeQuantity, removeFromCart} = useShopiContext();

	const {product, quantity, type = 'cart'} = props;
	const {title, price, image} = product;

	const increaseQuantity = () => changeQuantity(product, quantity + 1);
	const decreaseQuantity = () => changeQuantity(product, quantity - 1);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		changeQuantity(product, Math.floor(Number(e.target.value)));
	};

	return (
		<div className='grid grid-cols-[50px_1fr] items-center pb-2 mb-2 gap-2 border-b border-gray-300 select-none'>
			<figure className='w-[50px] h-[50px] flex items-center justify-center px-1'>
				<img src={image} alt={title} className='max-w-full max-h-full' />
			</figure>
			<div className='flex flex-col'>
				<p className='text-sm font-light'>{title}</p>
				<p className='text-lg font-medium'>
					{quantity === 1 ? (
						`$${price}`
					) : (
						<>
							<span>${price * quantity}</span>{' '}
							<span className='text-black/50 text-base'>(${price}</span>
							<XMarkIcon className='h-4 w-4 inline-block text-black/50 my-auto' />
							<span className='text-black/50 text-base'>{quantity})</span>
						</>
					)}
				</p>
				{type === 'cart' ? (
					<div className='flex items-center justify-between gap-2'>
						<div className='text-sm font-medium flex items-center border border-gray-300 rounded-md max-w-max my-2'>
							<MinusIcon
								className='h-6 w-6 p-1 border-r border-gray-300 text-black/70 cursor-pointer hover:bg-gray-100 hover:text-black/90 rounded-s'
								onClick={decreaseQuantity}
							/>
							<div contentEditable onChange={onChange} className='min-w-[45px] text-center'>
								{quantity}
							</div>
							<PlusIcon
								className='h-6 w-6 p-1 border-l border-gray-300 text-black/70 cursor-pointer hover:bg-gray-100 hover:text-black/90 rounded-e'
								onClick={increaseQuantity}
							/>
						</div>
						<TrashIcon
							className='h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer'
							onClick={() => removeFromCart(product)}
						/>
					</div>
				) : (
					<p className='text-sm font-light'>
						{quantity} item{quantity > 1 ? 's' : ''}
					</p>
				)}
			</div>
		</div>
	);
}
