import {useState, useContext, useEffect, createContext} from 'react';
import {normalizeText, formatText} from '../utils';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {getFavorites, getCart, getOrders} from '../utils/conversor';
import {getFirestoreFavorites, getFirestoreCart, getFirestoreOrders} from '../utils/conversor';
import {firebaseAuth} from '../firebase/auth';
import {firebaseFirestore} from '../firebase/firestore';

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

	const login = (email: string, password: string) =>
		firebaseAuth
			.login(email, password)
			.then((response) => {
				if (!response.user) {
					alert('Error logging in');
					return;
				}

				firebaseFirestore
					.getData(response.user.uid)
					.then((data) => {
						if (!data) {
							alert('Error logging in');
							return;
						}

						setUser({id: data.id, name: data.name, email: data.email});
						setFavorites(getFavorites(data.favorites, products));
						setCart(getCart(data.cart, products));
						setOrders(getOrders(data.orders, products));
						goTo('/');
					})
					.catch(() => alert('Error logging in'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/wrong-password') alert('Wrong password');
				else if (code === 'auth/user-not-found') alert('User not found');
				else if (code === 'auth/invalid-credential') alert('Invalid credential');
				else if (code === 'auth/network-request-failed') alert('Network error');
				else alert('Error logging in');
			});

	const signup = (name: string, email: string, password: string) =>
		firebaseAuth
			.signup(email, password)
			.then((response) => {
				if (!response.user) {
					alert('Error signing up');
					return;
				}

				firebaseFirestore
					.createUser({
						id: response.user.uid,
						name,
						email,
						favorites: getFirestoreFavorites(favorites),
						cart: getFirestoreCart(cart),
						orders: getFirestoreOrders(orders),
					})
					.then(() => {
						setUser({id: response.user.uid, name, email});
						goTo('/');
					})
					.catch(() => alert('Error signing up'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/email-already-in-use') alert('Email already in use');
				else if (code === 'auth/invalid-email') alert('Invalid email');
				else if (code === 'auth/weak-password') alert('Weak password');
				else if (code === 'auth/network-request-failed') alert('Network error');
				else alert('Error signing up');
			});

	const logout = () =>
		firebaseAuth
			.signout()
			.then(() => {
				setUser(null);
				setFavorites([]);
				setCart([]);
				setOrders([]);
				goTo('/login');
			})
			.catch(() => alert('Error logging out'));

	const editProfile = async (name: string) => {
		if (user) {
			firebaseFirestore
				.updateProfile(user.id, name)
				.then(() => setUser({...user, name}))
				.catch(() => alert('Error editing profile'));
		}
	};

	const changePassword = (password: string) =>
		firebaseAuth
			.changePassword(password)
			.then(() => {
				alert('Password changed successfully');
				goTo('/account');
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/requires-recent-login') alert('Recent login required');
				else if (code === 'auth/weak-password') alert('Weak password');
				else if (code === 'auth/network-request-failed') alert('Network error');
				else alert('Error changing password');
			});

	const deleteAccount = () =>
		firebaseAuth
			.deleteAccount()
			.then(() => {
				firebaseFirestore
					.deleteUser(user?.id || '')
					.then(() => {
						alert('Account deleted successfully');
						logout();
					})
					.catch(() => alert('Error deleting account'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/requires-recent-login') alert('Recent login required');
				else if (code === 'auth/network-request-failed') alert('Network error');
				else alert('Error deleting account');
			});

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
			id: product.id.toString(),
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

	const addFavorite = (product: Product) => {
		const newFavorites = [...favorites, product];
		setFavorites(newFavorites);

		if (user) {
			firebaseFirestore.updateFavorites(user.id, getFirestoreFavorites(newFavorites));
		}
	};
	const removeFavorite = (product: Product) => {
		const newFavorites = favorites.filter((p) => p.id !== product.id);
		setFavorites(newFavorites);

		if (user) {
			firebaseFirestore.updateFavorites(user.id, getFirestoreFavorites(newFavorites));
		}
	};

	// Product detail
	const [productToShow, setProductToShow] = useState<Product>();

	const openProductDetail = (product: Product) => {
		setProductToShow(product);
		closeCheckoutSideMenu();
	};

	const closeProductDetail = () => setProductToShow(undefined);

	// Cart
	const [cart, setCart] = useState<Cart>([]);

	const addToCart = (product: Product) => {
		const newCart = [...cart, {product, quantity: 1}];
		setCart(newCart);

		if (user) {
			firebaseFirestore.updateCart(user.id, getFirestoreCart(newCart));
		}
	};

	const removeFromCart = (product: Product) => {
		const newCart = cart.filter((p) => p.product.id !== product.id);
		setCart(newCart);

		if (user) {
			firebaseFirestore.updateCart(user.id, getFirestoreCart(newCart));
		}
	};

	const changeQuantity = (product: Product, quantity: number) => {
		if (quantity <= 0) return removeFromCart(product);

		const newCart = cart.map((p) => (p.product.id === product.id ? {...p, quantity} : p));
		setCart(newCart);

		if (user) {
			firebaseFirestore.updateCart(user.id, getFirestoreCart(newCart));
		}
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
			id: new Date().getTime().toString(),
			date: new Date().toISOString(),
			products: cart,
		};

		const newOrders = [...orders, newOrder];

		setOrders(newOrders);
		setCart([]);
		closeCheckoutSideMenu();

		if (user) {
			firebaseFirestore.updateOrders(user.id, getFirestoreOrders(newOrders));
			firebaseFirestore.updateCart(user.id, []);
		}
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
