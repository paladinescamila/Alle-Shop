import {Link} from 'react-router-dom';
import {XMarkIcon, ShoppingCartIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';
import OrderCard from '../OrderCard/OrderCard';
import {getTotalPrice} from '../../utils';

export default function CheckoutSideMenu() {
	const {isCheckoutSideMenuOpen, closeCheckoutSideMenu, cartProducts, handleCheckout} =
		useShoppingCartContext();

	return (
		<aside
			className={`w-[360px] h-[calc(100vh-80px)] flex flex-col fixed right-0 border border-black rounded-lg bg-white ${
				isCheckoutSideMenuOpen ? 'flex' : 'hidden'
			}`}>
			<div className='flex justify-between items-center p-6'>
				<h2 className='font-medium text-xl'>My order</h2>
				<XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={closeCheckoutSideMenu} />
			</div>
			{cartProducts.length > 0 ? (
				<>
					<div className='px-6 overflow-y-scroll flex-1'>
						{cartProducts.map((product) => (
							<OrderCard key={product.id} product={product} />
						))}
					</div>
					<div className='px-6 mb-6'>
						<p className='flex justify-between items-center mb-2'>
							<span className='font-light'>Total:</span>
							<span className='font-medium'>
								${getTotalPrice(cartProducts).toLocaleString()}
							</span>
						</p>
						<Link to='/my-orders/last'>
							<button
								className='bg-black py-3 text-white w-full rounded-lg'
								onClick={handleCheckout}>
								Checkout
							</button>
						</Link>
					</div>
				</>
			) : (
				<div className='flex flex-col items-center justify-center gap-3 flex-1 p-6'>
					<ShoppingCartIcon className='h-24 w-24 text-black mx-auto' />
					<p className='text-center font-light text-black text-xl'>Your cart is empty</p>
					<p className='text-center font-light text-gray-400 text-sm'>
						Looks like you haven't added any products yet.
					</p>
				</div>
			)}
		</aside>
	);
}
