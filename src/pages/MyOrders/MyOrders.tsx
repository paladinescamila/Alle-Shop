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
			<div className='flex items-center justify-center w-80 mb-4'>
				<h1 className='font-medium text-xl'>My Orders</h1>
			</div>
			{orders?.sort(compare).map((order, index) => (
				<Link to={`/my-orders/${order.id}`} key={index}>
					<OrdersCard key={order.id} order={order} />
				</Link>
			))}
		</Layout>
	);
}
