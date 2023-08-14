import {useRoutes} from 'react-router-dom';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CheckoutSideMenu from './components/CheckoutSideMenu/CheckoutSideMenu';
import {useShoppingCartContext} from './Context';
import './App.css';

// Pages
import ProductsList from './pages/ProductsList/ProductsList';
import MyAccount from './pages/MyAccount/MyAccount';
import MyOrder from './pages/MyOrder/MyOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Signin from './pages/Signin/Signin';
import NotFound from './pages/NotFound/NotFound';
import NavBar from './components/NavBar/NavBar';

const AppRoutes = () => {
	const {categories} = useShoppingCartContext();

	return useRoutes([
		// All products
		{path: '/', element: <ProductsList />},

		// Categories
		...Object.keys(categories).map((category) => ({
			path: `/${category}`,
			element: <ProductsList />,
		})),

		// Orders management
		{path: '/my-orders', element: <MyOrders />},
		{path: '/my-orders/last', element: <MyOrder />},
		{path: '/my-orders/:id', element: <MyOrder />},

		// User management
		{path: '/my-account', element: <MyAccount />},
		{path: '/signin', element: <Signin />},

		// Not found
		{path: '*', element: <NotFound />},
	]);
};

function App() {
	return (
		<>
			<AppRoutes />
			<NavBar />
			<ProductDetail />
			<CheckoutSideMenu />
		</>
	);
}

export default App;
