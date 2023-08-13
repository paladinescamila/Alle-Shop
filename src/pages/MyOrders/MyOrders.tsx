import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {useShoppingCartContext} from '../../Context';
import OrdersCard from '../../components/OrdersCard/OrdersCard';

export default function MyOrders() {
	const {orders} = useShoppingCartContext();

	// recent to old compare
	const compare = (a: Order, b: Order) => b.date.getTime() - a.date.getTime();

	return (
		<Layout>
			{orders.length ? (
				orders.sort(compare).map((order, index) => (
					<Link to={`/my-orders/${order.id}`} key={index}>
						<OrdersCard key={order.id} order={order} />
					</Link>
				))
			) : (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					You have no orders yet.
				</div>
			)}
		</Layout>
	);
}
