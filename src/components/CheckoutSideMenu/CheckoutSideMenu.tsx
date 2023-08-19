import {Link} from 'react-router-dom';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShopiContext} from '../../context';
import OrderCard from '../OrderCard/OrderCard';
import {getTotalPrice, useResponsive} from '../../utils';

export default function CheckoutSideMenu() {
	const {isCheckoutSideMenuOpen, closeCheckoutSideMenu, cart, handleCheckout} = useShopiContext();
	const {isMobile} = useResponsive();

	return (
		<aside
			className={`h-[calc(100vh-68px)] flex flex-col fixed border border-black bg-white transition-all duration-300 bottom-0 ${
				isMobile ? 'w-full h-[100vh] z-30 border-x-0' : 'w-[350px]'
			} ${
				isCheckoutSideMenuOpen
					? 'right-0'
					: isMobile
					? 'bottom-[calc(-100vh)]'
					: 'right-[calc(-350px)]'
			}`}>
			<div className='flex justify-between items-center p-6'>
				<h2 className='font-medium text-xl'>My order</h2>
				<XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={closeCheckoutSideMenu} />
			</div>
			{cart.length > 0 ? (
				<>
					<div className='px-6 overflow-y-scroll flex-1'>
						{cart.map(({product, quantity}) => (
							<OrderCard key={product.id} product={product} quantity={quantity} />
						))}
					</div>
					<div className='px-6 mb-6 mt-3'>
						<p className='flex justify-between items-center mb-2'>
							<span className='font-light'>Total:</span>
							<span className='font-medium'>${getTotalPrice(cart).toLocaleString()}</span>
						</p>
						<Link to='/orders/last'>
							<button className='bg-black py-3 text-white w-full ' onClick={handleCheckout}>
								Checkout
							</button>
						</Link>
					</div>
				</>
			) : (
				<p className='flex items-center justify-center flex-1 p-10 text-center font-light text-gray-500 text-xl'>
					Your cart is empty
				</p>
			)}
		</aside>
	);
}
