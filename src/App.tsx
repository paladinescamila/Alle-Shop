import {useRoutes} from 'react-router-dom';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CheckoutSideMenu from './components/CheckoutSideMenu/CheckoutSideMenu';
import {useShopiContext} from './Context';
import './App.css';

// Pages
import ProductsList from './pages/ProductsList/ProductsList';
import Favorites from './pages/Favorites/Favorites';
import Order from './pages/Order/Order';
import Account from './pages/Account/Account';
import Orders from './pages/Orders/Orders';
import Signin from './pages/Signin/Signin';
import NotFound from './pages/NotFound/NotFound';
import NavBar from './components/NavBar/NavBar';

const AppRoutes = () => {
	const {categories} = useShopiContext();

	return useRoutes([
		// All products
		{path: '/', element: <ProductsList />},

		// Categories
		...Object.keys(categories).map((category) => ({
			path: `/${category}`,
			element: <ProductsList />,
		})),

		// Orders
		{path: '/orders', element: <Orders />},
		{path: '/orders/last', element: <Order />},
		{path: '/orders/:id', element: <Order />},

		// Favorites
		{path: '/favorites', element: <Favorites />},

		// User
		{path: '/account', element: <Account />},
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
