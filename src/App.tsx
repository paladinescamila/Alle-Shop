import {useRoutes, BrowserRouter} from 'react-router-dom';
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
		{path: '/my-order', element: <MyOrder />},
		{path: '/my-orders', element: <MyOrders />},
		{path: '/signin', element: <Signin />},
		{path: '*', element: <NotFound />},
	]);
};

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
