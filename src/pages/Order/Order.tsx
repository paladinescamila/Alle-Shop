import {Link, useParams} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import OrderCard from '../../components/OrderCard/OrderCard';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import {useMyContext} from '../../context';
import {getTotalPrice} from '../../utils';

export default function Order() {
	const {orders} = useMyContext();

	const currentPath = window.location.pathname;
	const subPath = currentPath.split('/').pop();
	const params = useParams();

	let order: Order | undefined;

	if (subPath === 'last') order = orders?.[orders.length - 1];
	else order = orders?.find((order) => order.id === params.id);

	return (
		<Layout>
			<div className='flex items-center justify-center w-80 relative mb-6'>
				<Link to='/orders' className='absolute left-0'>
					<ArrowLeftIcon className='w-6 inline-block mr-2 text-gray-400 hover:text-black cursor-pointer' />
				</Link>
				<h1 className='font-medium text-xl'>My Order</h1>
			</div>
			{order ? (
				<div className='flex justify-between items-center mb-10 w-80 mt-auto p-2 border border-gray-300'>
					<p className='font-light flex flex-col'>
						<span className='text-lg'>{new Date(order.date).toLocaleDateString()}</span>
						<span className='text-xs text-black/50'>
							{new Date(order.date).toLocaleTimeString()}
						</span>
					</p>
					<span className='font-medium text-xl'>${getTotalPrice(order.products)}</span>
				</div>
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
