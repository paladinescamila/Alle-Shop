import Layout from '../../components/Layout/Layout';
import OrderCard from '../../components/OrderCard/OrderCard';
import {useShoppingCartContext} from '../../Context';

export default function MyOrder() {
	const {orders} = useShoppingCartContext();

	return (
		<Layout>
			<h1>My Order</h1>
			<div className='flex flex-col w-80'>
				{orders?.slice(-1)[0]?.products.map((product) => (
					<OrderCard key={product.id} product={product} type='order' />
				))}
			</div>
		</Layout>
	);
}
