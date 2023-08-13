import {Link, useParams} from 'react-router-dom';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import Layout from '../../components/Layout/Layout';
import OrderCard from '../../components/OrderCard/OrderCard';
import {useShoppingCartContext} from '../../Context';
import {getTotalPrice} from '../../utils';

export default function MyOrder() {
	const {orders} = useShoppingCartContext();

	const currentPath = window.location.pathname;
	const subPath = currentPath.split('/').pop();
	const params = useParams();
	let order: Order | undefined;

	if (subPath === 'last') {
		order = orders?.[orders.length - 1];
	} else {
		order = orders?.find((order) => order.id === Number(params.id));
	}

	return (
		<Layout>
			<div className='flex items-center justify-center w-80 relative mb-6'>
				<Link to='/my-orders' className='absolute left-0'>
					<ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
				</Link>
				<h1 className='font-medium text-xl'>My Order</h1>
			</div>
			<div className='flex flex-col w-80'>
				{order?.products.map((product) => (
					<OrderCard key={product.id} product={product} type='order' />
				))}
			</div>
			{order && (
				<p className='flex justify-between items-center mb-2 w-80 mt-auto'>
					<span className='font-light'>Total:</span>
					<span className='font-medium'>${getTotalPrice(order.products).toLocaleString()}</span>
				</p>
			)}
		</Layout>
	);
}
