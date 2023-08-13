import {XMarkIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';
import {useResponsive} from '../../utils';

export default function ProductDetail() {
	const {cartProducts, productToShow, closeProductDetail, addToCart, removeFromCart, openCheckoutSideMenu} =
		useShoppingCartContext();
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
			className={`h-[calc(100vh-68px)] flex flex-col fixed border border-black bg-white p-6 transition-all duration-300 bottom-0 ${
				isMobile ? 'w-full h-[100vh] border-none z-30' : 'w-[350px]'
			} ${productToShow ? 'right-0' : isMobile ? 'bottom-[calc(-100vh)]' : 'right-[calc(-350px)]'}`}>
			<div className='flex justify-between items-center pb-6'>
				<h2 className='font-medium text-xl'>Detail</h2>
				<XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={closeProductDetail} />
			</div>
			{productToShow && (
				<>
					<figure className='relative'>
						<img
							src={productToShow.images[0]}
							alt={productToShow.title}
							className='w-full max-h-96 object-cover '
						/>
						<span className='absolute bottom-0 left-0 bg-white/70 rounded-xl text-black text-xs m-2 px-3 py-0.5'>
							{productToShow.category.name}
						</span>
					</figure>
					<p className='flex flex-col py-3'>
						<span className='font-medium text-2xl mb-2'>${productToShow.price}</span>
						<span className='font-medium text-2md mb-2'>{productToShow.title}</span>
						<span className='font-light text-sm'>{productToShow.description}</span>
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
