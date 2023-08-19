import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {useShopiContext} from '../../context';
import OrdersCard from '../../components/OrdersCard/OrdersCard';
import {useResponsive} from '../../utils';

export default function Orders() {
	const {orders} = useShopiContext();
	const {isSmallDesktop, isTablet, isSmallTablet, isMobile} = useResponsive();
	const compare = (a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime();

	const today = new Date(),
		yesterday = new Date(today),
		lastWeek = new Date(today);

	const todaysOrders = orders
		.filter((order) => {
			const orderDate = new Date(order.date);
			return (
				orderDate.getDate() === today.getDate() &&
				orderDate.getMonth() === today.getMonth() &&
				orderDate.getFullYear() === today.getFullYear()
			);
		})
		.sort(compare);

	const yesterdaysOrders = orders
		.filter((order) => {
			const orderDate = new Date(order.date);
			return (
				orderDate.getDate() === yesterday.setDate(yesterday.getDate() - 1) &&
				orderDate.getMonth() === yesterday.getMonth() &&
				orderDate.getFullYear() === yesterday.getFullYear()
			);
		})
		.sort(compare);

	const lastWeeksOrders = orders
		.filter((order) => {
			const orderDate = new Date(order.date);
			return (
				orderDate.getDate() >= lastWeek.setDate(lastWeek.getDate() - 7) &&
				orderDate.getMonth() === lastWeek.getMonth() &&
				orderDate.getFullYear() === lastWeek.getFullYear()
			);
		})
		.sort(compare);

	return (
		<Layout>
			{(isSmallDesktop || isTablet || isSmallTablet || isMobile) && (
				<h1 className='font-medium text-xl mb-5'>Orders</h1>
			)}
			{orders.length ? (
				<div>
					{todaysOrders.length > 0 && (
						<>
							<h2 className='font-medium text-lg mb-2'>Today</h2>
							{todaysOrders.map((order, index) => (
								<Link to={`/orders/${order.id}`} key={index}>
									<OrdersCard key={order.id} order={order} />
								</Link>
							))}
						</>
					)}
					{yesterdaysOrders.length > 0 && (
						<>
							<h2 className='font-medium text-lg mb-2'>Yesterday</h2>
							{yesterdaysOrders.map((order, index) => (
								<Link to={`/orders/${order.id}`} key={index}>
									<OrdersCard key={order.id} order={order} />
								</Link>
							))}
						</>
					)}
					{lastWeeksOrders.length > 0 && (
						<>
							<h2 className='font-medium text-lg mb-2'>Last week</h2>
							{lastWeeksOrders.map((order, index) => (
								<Link to={`/orders/${order.id}`} key={index}>
									<OrdersCard key={order.id} order={order} />
								</Link>
							))}
						</>
					)}
				</div>
			) : (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					You have no orders yet.
				</div>
			)}
		</Layout>
	);
}
