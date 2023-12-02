import {useRoutes} from 'react-router-dom';
import {useMyContext} from './context';
import './App.css';

// Components
import ProductDetail from './components/ProductDetail/ProductDetail';
import CheckoutSideMenu from './components/CheckoutSideMenu/CheckoutSideMenu';
import NavBar from './components/NavBar/NavBar';

// Pages
import ProductsList from './pages/ProductsList/ProductsList';
import Orders from './pages/Orders/Orders';
import Order from './pages/Order/Order';
import Favorites from './pages/Favorites/Favorites';
import Account from './pages/Account/Account';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import NotFound from './pages/NotFound/NotFound';
import Alert from './components/Alert/Alert';

const AppRoutes = () => {
	const {categories} = useMyContext();

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

		// Account
		{path: '/account', element: <Account />},
		{path: '/login', element: <LogIn />},
		{path: '/signup', element: <SignUp />},
		{path: '/edit-profile', element: <EditProfile />},
		{path: '/change-password', element: <ChangePassword />},

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
			<Alert />
		</>
	);
}

export default App;
