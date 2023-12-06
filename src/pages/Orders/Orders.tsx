import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import OrdersCard from '../../components/OrdersCard/OrdersCard';
import {useMyContext} from '../../context';
import {useResponsive} from '../../utils';

export default function Orders() {
	const {orders} = useMyContext();
	const {isSmallDesktop, isTablet, isSmallTablet, isMobile} = useResponsive();

	const [todaysOrders, setTodaysOrders] = useState<Order[]>([]);
	const [yesterdaysOrders, setYesterdaysOrders] = useState<Order[]>([]);
	const [lastWeeksOrders, setLastWeeksOrders] = useState<Order[]>([]);
	const [olderOrders, setOlderOrders] = useState<Order[]>([]);

	useEffect(() => {
		const today = new Date();
		const yesterday = new Date(today);
		const lastWeek = new Date(today);

		const newTodaysOrders: Order[] = [];
		const newYesterdaysOrders: Order[] = [];
		const newLastWeeksOrders: Order[] = [];
		const newOlderOrders: Order[] = [];

		for (const order of orders) {
			const orderDate = new Date(order.date);

			if (
				orderDate.getDate() === today.getDate() &&
				orderDate.getMonth() === today.getMonth() &&
				orderDate.getFullYear() === today.getFullYear()
			)
				newTodaysOrders.push(order);
			else if (
				orderDate.getDate() === yesterday.setDate(yesterday.getDate() - 1) &&
				orderDate.getMonth() === yesterday.getMonth() &&
				orderDate.getFullYear() === yesterday.getFullYear()
			)
				newYesterdaysOrders.push(order);
			else if (
				orderDate.getDate() >= lastWeek.setDate(lastWeek.getDate() - 7) &&
				orderDate.getMonth() === lastWeek.getMonth() &&
				orderDate.getFullYear() === lastWeek.getFullYear()
			)
				newLastWeeksOrders.push(order);
			else newOlderOrders.push(order);

			const compare = (a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime();

			setTodaysOrders(newTodaysOrders.sort(compare));
			setYesterdaysOrders(newYesterdaysOrders.sort(compare));
			setLastWeeksOrders(newLastWeeksOrders.sort(compare));
			setOlderOrders(newOlderOrders.sort(compare));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orders]);

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
					{olderOrders.length > 0 && (
						<>
							<h2 className='font-medium text-lg mb-2'>Older</h2>
							{olderOrders.map((order, index) => (
								<Link to={`/orders/${order.id}`} key={index}>
									<OrdersCard key={order.id} order={order} />
								</Link>
							))}
						</>
					)}
				</div>
			) : (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					You have no orders
				</div>
			)}
		</Layout>
	);
}
