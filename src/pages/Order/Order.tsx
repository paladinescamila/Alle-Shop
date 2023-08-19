import {Link, useParams} from 'react-router-dom';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import Layout from '../../components/Layout/Layout';
import OrderCard from '../../components/OrderCard/OrderCard';
import {useShopiContext} from '../../context';
import {getTotalPrice} from '../../utils';

export default function Order() {
	const {orders} = useShopiContext();

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
				<Link to='/orders' className='absolute left-0'>
					<ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
				</Link>
				<h1 className='font-medium text-xl'>My Order</h1>
			</div>
			{order ? (
				<p className='flex justify-between items-center mb-10 w-80 mt-auto p-2 border border-gray-300'>
					<p className='font-light flex flex-col'>
						<span className='text-lg'>{new Date(order.date).toLocaleDateString()}</span>
						<span className='text-xs text-black/50'>
							{new Date(order.date).toLocaleTimeString()}
						</span>
					</p>
					<span className='font-medium text-xl'>
						${getTotalPrice(order.products).toLocaleString()}
					</span>
				</p>
			) : (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					The order you are looking for doesn't exist.
				</div>
			)}
			<div className='flex flex-col w-80'>
				{order?.products.map(({product, quantity}) => (
					<OrderCard key={product.id} product={product} quantity={quantity} type='order' />
				))}
			</div>
		</Layout>
	);
}
