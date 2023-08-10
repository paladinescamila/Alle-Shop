import {useRoutes, BrowserRouter} from 'react-router-dom';
import {ShoppingCartProvider} from './Context';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import MyOrder from './pages/MyOrder/MyOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Signin from './pages/Signin/Signin';
import NotFound from './pages/NotFound/NotFound';
import NavBar from './components/NavBar/NavBar';

const AppRoutes = () => {
	return useRoutes([
		{path: '/', element: <Home />},
		{path: '/my-account', element: <MyAccount />},
		{path: '/my-orders', element: <MyOrders />},
		{path: '/my-orders/last', element: <MyOrder />},
		{path: '/my-orders/:id', element: <MyOrder />},
		{path: '/signin', element: <Signin />},
		{path: '*', element: <NotFound />},
	]);
};

function App() {
	return (
		<ShoppingCartProvider>
			<BrowserRouter>
				<NavBar />
				<AppRoutes />
			</BrowserRouter>
		</ShoppingCartProvider>
	);
}

export default App;
