import {useState, useContext, useEffect, createContext} from 'react';
import {normalizeText, formatText} from '../utils';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {firebaseAuth} from '../firebase/auth';

interface ContextProps {
	goTo: (path: string) => void;

	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	editProfile: (name: string) => Promise<void>;
	changePassword: (password: string) => Promise<void>;
	deleteAccount: () => Promise<void>;

	products: Product[];
	categories: Categories;
	gettingProducts: boolean;

	favorites: Product[];
	addFavorite: (product: Product) => void;
	removeFavorite: (product: Product) => void;

	productToShow: Product | undefined;
	openProductDetail: (product: Product) => void;
	closeProductDetail: () => void;

	cart: Cart;
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
	changeQuantity: (product: Product, quantity: number) => void;

	isCheckoutSideMenuOpen: boolean;
	openCheckoutSideMenu: () => void;
	closeCheckoutSideMenu: () => void;

	orders: Order[];
	handleCheckout: () => void;
}

const MyContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const MyProvider = (props: ProviderProps) => {
	// Navigation
	const navigate = useNavigate();

	const goTo = (path: string) => navigate(path);

	// Account
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		try {
			const response = await firebaseAuth.login(email, password);

			if (response.user) {
				setUser({id: response.user.uid, name: response.user.displayName || '', email});
				goTo('/');
			}
		} catch (error) {
			if (error.code === 'auth/wrong-password') alert('Wrong password');
			else if (error.code === 'auth/user-not-found') alert('User not found');
			else if (error.code === 'auth/invalid-credential') alert('Invalid credential');
			else if (error.code === 'auth/network-request-failed') alert('Network error');
			else alert('Error logging in');
		}
	};

	const signup = async (name: string, email: string, password: string) => {
		try {
			const response = await firebaseAuth.signup(email, password);

			if (response.user) {
				setUser({
					id: response.user.uid,
					name: name || '',
					email,
				});
				goTo('/');
			}
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') alert('Email already in use');
			else if (error.code === 'auth/invalid-email') alert('Invalid email');
			else if (error.code === 'auth/weak-password') alert('Weak password');
			else if (error.code === 'auth/network-request-failed') alert('Network error');
			else alert('Error signing up');
		}
	};

	const logout = () =>
		firebaseAuth.signout().then(() => {
			setUser(null);
			setFavorites([]);
			setCart([]);
			setOrders([]);
			goTo('/login');
		});

	const editProfile = async (name: string) => {
		if (user) setUser({...user, name});
	};

	const changePassword = async (password: string) => {
		try {
			await firebaseAuth.changePassword(password);
			alert('Password changed successfully');
			goTo('/account');
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') alert('Recent login required');
			else if (error.code === 'auth/weak-password') alert('Weak password');
			else if (error.code === 'auth/network-request-failed') alert('Network error');
			else alert('Error changing password');
		}
	};

	const deleteAccount = async () => {
		try {
			await firebaseAuth.deleteAccount();
			alert('Account deleted successfully');
			logout();
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') alert('Recent login required');
			else if (error.code === 'auth/network-request-failed') alert('Network error');
			else alert('Error deleting account');
		}
	};

	// Products
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Categories>({});
	const [gettingProducts, setGettingProducts] = useState<boolean>(true);

	const loadProducts = async () => {
		setGettingProducts(true);
		const response = await axios.get<Product[]>('https://fakestoreapi.com/products');

		// Get products
		const newProducts: Product[] = response.data.map((product: Product) => ({
			...product,
			category: normalizeText(product.category),
		}));

		setProducts(newProducts);

		// Get categories
		const map: {[key: string]: number} = {};

		for (let i = 0; i < response.data.length; i++) {
			const category = response.data[i].category;

			if (map[category]) map[category]++;
			else map[category] = 1;
		}

		const array = Object.keys(map).sort((a, b) => {
			return map[b] - map[a];
		});

		const newCategories: Categories = {};

		for (const [index, category] of array.entries()) {
			newCategories[normalizeText(category)] = {
				id: normalizeText(category),
				name: formatText(category),
				colorIndex: index,
			};
		}

		setCategories(newCategories);
		setGettingProducts(false);
	};

	// Favorites
	const [favorites, setFavorites] = useState<Product[]>([]);
	const addFavorite = (product: Product) => setFavorites([...favorites, product]);
	const removeFavorite = (product: Product) => setFavorites(favorites.filter((p) => p.id !== product.id));

	// Product detail
	const [productToShow, setProductToShow] = useState<Product>();

	const openProductDetail = (product: Product) => {
		setProductToShow(product);
		closeCheckoutSideMenu();
	};

	const closeProductDetail = () => setProductToShow(undefined);

	// Cart
	const [cart, setCart] = useState<Cart>([]);
	const addToCart = (product: Product) => setCart([...cart, {product, quantity: 1}]);
	const removeFromCart = (product: Product) => setCart(cart.filter((p) => p.product.id !== product.id));

	const changeQuantity = (product: Product, quantity: number) => {
		if (quantity <= 0) return removeFromCart(product);
		setCart(cart.map((p) => (p.product.id === product.id ? {...p, quantity} : p)));
	};

	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState<boolean>(false);

	const openCheckoutSideMenu = () => {
		setIsCheckoutSideMenuOpen(true);
		closeProductDetail();
	};

	const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

	// Orders
	const [orders, setOrders] = useState<Order[]>([]);

	const handleCheckout = () => {
		const newOrder: Order = {
			id: new Date().getTime(),
			date: new Date().toISOString(),
			products: cart,
		};

		setOrders([...orders, newOrder]);
		setCart([]);
		closeCheckoutSideMenu();
	};

	// Data persistence
	const [firstRender, setFirstRender] = useState<boolean>(true);

	useEffect(() => {
		if (firstRender) {
			loadProducts().then(() => {
				const userData = localStorage.getItem('user');
				const favoritesData = localStorage.getItem('favorites');
				const cartData = localStorage.getItem('cart');
				const ordersData = localStorage.getItem('orders');

				if (userData) setUser(JSON.parse(userData));
				if (favoritesData) setFavorites(JSON.parse(favoritesData));
				if (cartData) setCart(JSON.parse(cartData));
				if (ordersData) setOrders(JSON.parse(ordersData));

				setFirstRender(false);
			});
		} else if (!gettingProducts) {
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('favorites', JSON.stringify(favorites));
			localStorage.setItem('cart', JSON.stringify(cart));
			localStorage.setItem('orders', JSON.stringify(orders));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, favorites, cart, orders]);

	return (
		<MyContext.Provider
			value={{
				goTo,

				user,
				login,
				signup,
				logout,
				editProfile,
				changePassword,
				deleteAccount,

				products,
				categories,

				gettingProducts,

				favorites,
				addFavorite,
				removeFavorite,

				productToShow,
				openProductDetail,
				closeProductDetail,

				cart,
				addToCart,
				removeFromCart,
				changeQuantity,

				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,

				orders,
				handleCheckout,
			}}>
			{props.children}
		</MyContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => useContext(MyContext);
