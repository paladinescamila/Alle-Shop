import {XMarkIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/solid';
import Button from '../Button/Button';
import {useMyContext} from '../../context';
import {useResponsive} from '../../utils';

export default function ProductDetail() {
	const {productToShow, closeProductDetail} = useMyContext();
	const {cart, addToCart, removeFromCart} = useMyContext();
	const {isMobile} = useResponsive();

	const productInCart = cart.find(({product}) => product.id === productToShow?.id);

	const addOrRemoveFromCart = () => {
		if (!productToShow) return;

		if (productInCart) removeFromCart(productToShow);
		else addToCart(productToShow);
	};

	return (
		<aside
			className={`h-[calc(100vh-68px)] flex flex-col fixed border border-black bg-white p-6 transition-all duration-300 bottom-0 overflow-scroll ${
				isMobile ? 'w-full h-[100%] z-30 border-x-0' : 'w-[350px]'
			} ${productToShow ? 'right-0' : isMobile ? 'bottom-[calc(-100vh)]' : 'right-[calc(-350px)]'}`}>
			<div className='flex justify-between items-center pb-6'>
				<h2 className='font-medium text-xl'>Detail</h2>
				<XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={closeProductDetail} />
			</div>
			{productToShow && (
				<>
					<figure className='flex justify-center items-center w-full h-60'>
						<img
							src={productToShow.image}
							alt={productToShow.title}
							className='max-w-full max-h-full'
						/>
					</figure>
					<p className='flex flex-col gap-2 py-3'>
						<span className='font-medium text-2xl'>${productToShow.price}</span>
						<span className='font-medium text-2md'>{productToShow.title}</span>
						<span className='font-light text-sm'>{productToShow.description}</span>
					</p>
					<Button
						text={productInCart ? 'Remove from cart' : 'Add to cart'}
						onClick={addOrRemoveFromCart}
						icon={
							productInCart ? (
								<MinusIcon className='h-5 w-5' />
							) : (
								<PlusIcon className='h-5 w-5' />
							)
						}
						className='mt-auto'
						secondary
					/>
				</>
			)}
		</aside>
	);
}
