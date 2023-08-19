import {useRoutes} from 'react-router-dom';
import {useShopiContext} from './context';
import './App.css';

// Components
import ProductDetail from './components/ProductDetail/ProductDetail';
import CheckoutSideMenu from './components/CheckoutSideMenu/CheckoutSideMenu';
import NavBar from './components/NavBar/NavBar';

// Pages
import ProductsList from './pages/ProductsList/ProductsList';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';
import Order from './pages/Order/Order';
import NotFound from './pages/NotFound/NotFound';

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
