import {Link} from 'react-router-dom';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';
import OrderCard from '../OrderCard/OrderCard';
import {totalPrice} from '../../utils';

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
			<div className='px-6 overflow-y-scroll flex-1'>
				{cartProducts.map((product) => (
					<OrderCard key={product.id} product={product} />
				))}
			</div>
			<div className='px-6 mb-6'>
				<p className='flex justify-between items-center mb-2'>
					<span className='font-light'>Total:</span>
					<span className='font-medium'>${totalPrice(cartProducts)}</span>
				</p>
				<Link to='/my-orders/last'>
					<button className='bg-black py-3 text-white w-full rounded-lg' onClick={handleCheckout}>
						Checkout
					</button>
				</Link>
			</div>
		</aside>
	);
}
