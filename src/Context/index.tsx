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
	alert: Alert;
	showAlert: boolean;
	openAlert: (
		text: string,
		type: 'success' | 'error' | 'question' | 'warning',
		onAccept?: () => void,
		onCancel?: () => void
	) => void;
	closeAlert: () => void;

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

	const [alert, setAlert] = useState<Alert>({
		text: ' ',
		type: 'success',
		onAccept: () => {},
		onCancel: () => {},
	});

	const [showAlert, setShowAlert] = useState<boolean>(false);

	const openAlert = (
		text: string,
		type: 'success' | 'error' | 'question' | 'warning',
		onAccept?: () => void,
		onCancel?: () => void
	) => {
		setShowAlert(false);
		setAlert({
			text: ' ',
			type: 'success',
			onAccept: onAccept || (() => {}),
			onCancel: onCancel || (() => {}),
		});

		setTimeout(() => {
			setShowAlert(true);
			setAlert({
				text,
				type,
				onAccept: onAccept || (() => {}),
				onCancel: onCancel || (() => {}),
			});

			if (type !== 'question') setTimeout(() => setShowAlert(false), 3.5 * 1000);
		}, 100);
	};

	const closeAlert = () => setShowAlert(false);

	// Account
	const [user, setUser] = useState<User | null>(null);

	const login = (email: string, password: string) =>
		firebaseAuth
			.login(email, password)
			.then((response) => {
				if (!response.user) {
					openAlert('Error logging in', 'error');
					return;
				}

				firebaseFirestore
					.getData(response.user.uid)
					.then((data) => {
						if (!data) {
							openAlert('Error logging in', 'error');
							return;
						}

						setUser({id: data.id, name: data.name, email: data.email});
						setFavorites(getFavorites(data.favorites, products));
						setCart(getCart(data.cart, products));
						setOrders(getOrders(data.orders, products));
						goTo('/');
					})
					.catch(() => openAlert('Error logging in', 'error'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/wrong-password') openAlert('Wrong password', 'error');
				else if (code === 'auth/user-not-found') openAlert('User not found', 'error');
				else if (code === 'auth/invalid-credential') openAlert('Invalid credential', 'error');
				else if (code === 'auth/network-request-failed') openAlert('Network error', 'error');
				else openAlert('Error logging in', 'error');
			});

	const signup = (name: string, email: string, password: string) =>
		firebaseAuth
			.signup(email, password)
			.then((response) => {
				if (!response.user) {
					openAlert('Error signing up', 'error');
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
					.catch(() => openAlert('Error signing up', 'error'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/email-already-in-use') openAlert('Email already in use', 'error');
				else if (code === 'auth/invalid-email') openAlert('Invalid email', 'error');
				else if (code === 'auth/weak-password') openAlert('Weak password', 'error');
				else if (code === 'auth/network-request-failed') openAlert('Network error', 'error');
				else openAlert('Error signing up', 'error');
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
			.catch(() => openAlert('Error logging out', 'error'));

	const editProfile = async (name: string) => {
		if (user) {
			firebaseFirestore
				.updateProfile(user.id, name)
				.then(() => {
					setUser({...user, name});
					openAlert('Profile edited successfully', 'success');
					goTo('/account');
				})
				.catch(() => openAlert('Error editing profile', 'error'));
		}
	};

	const changePassword = (password: string) =>
		firebaseAuth
			.changePassword(password)
			.then(() => {
				openAlert('Password changed successfully', 'success');
				goTo('/account');
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/requires-recent-login') openAlert('Recent login required', 'error');
				else if (code === 'auth/weak-password') openAlert('Weak password', 'error');
				else if (code === 'auth/network-request-failed') openAlert('Network error', 'error');
				else openAlert('Error changing password', 'error');
			});

	const deleteAccount = () =>
		firebaseAuth
			.deleteAccount()
			.then(() => {
				firebaseFirestore
					.deleteUser(user?.id || '')
					.then(() => {
						openAlert('Account deleted successfully', 'success');
						logout();
					})
					.catch(() => openAlert('Error deleting account', 'error'));
			})
			.catch(({code}: {code: string}) => {
				if (code === 'auth/requires-recent-login') openAlert('Recent login required', 'error');
				else if (code === 'auth/network-request-failed') openAlert('Network error', 'error');
				else openAlert('Error deleting account', 'error');
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

				if (userData) setUser(JSON.parse(userData || 'null'));
				if (favoritesData) setFavorites(JSON.parse(favoritesData || '[]'));
				if (cartData) setCart(JSON.parse(cartData || '[]'));
				if (ordersData) setOrders(JSON.parse(ordersData || '[]'));

				setFirstRender(false);
			});
		} else if (!gettingProducts) {
			localStorage.setItem('user', JSON.stringify(user || null));
			localStorage.setItem('favorites', JSON.stringify(favorites || []));
			localStorage.setItem('cart', JSON.stringify(cart || []));
			localStorage.setItem('orders', JSON.stringify(orders || []));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, favorites, cart, orders]);

	return (
		<MyContext.Provider
			value={{
				goTo,
				alert,
				showAlert,
				openAlert,
				closeAlert,

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
