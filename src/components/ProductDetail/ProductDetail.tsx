import {XMarkIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/solid';
import {useShopiContext} from '../../Context';
import {useResponsive} from '../../utils';

export default function ProductDetail() {
	const {cartProducts, productToShow, closeProductDetail, addToCart, removeFromCart, openCheckoutSideMenu} =
		useShopiContext();
	const productInCart = cartProducts.find((product) => product.id === productToShow?.id);

	const addOrRemoveFromCart = () => {
		if (!productToShow) return;
		openCheckoutSideMenu();

		if (productInCart) removeFromCart(productToShow);
		else addToCart(productToShow);
	};

	const {isMobile} = useResponsive();

	return (
		<aside
			className={`h-[calc(100vh-68px)] flex flex-col fixed border border-black bg-white p-6 transition-all duration-300 bottom-0 overflow-scroll ${
				isMobile ? 'w-full h-[100%] z-30' : 'w-[350px]'
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
					<button
						className='flex gap-3 items-center justify-center w-full py-3 mt-auto border border-black bg-white'
						onClick={addOrRemoveFromCart}>
						{productInCart ? (
							<MinusIcon className='h-5 w-5 cursor-pointer' />
						) : (
							<PlusIcon className='h-5 w-5 cursor-pointer' />
						)}
						{productInCart ? 'Remove from cart' : 'Add to cart'}
					</button>
				</>
			)}
		</aside>
	);
}
