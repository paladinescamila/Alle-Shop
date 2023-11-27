import {useState, useContext, useEffect, createContext} from 'react';
import {normalizeText, formatText} from '../utils';
import axios from 'axios';

interface ContextProps {
	user: User | null;
	logIn: (email: string, password: string) => void;
	logOut: () => void;
	signUp: (name: string, email: string, password: string) => void;

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
	// Account
	const [user, setUser] = useState<User | null>(null);

	const logIn = (email: string, password: string) => {
		setUser({email, password, name: ''});
	};

	const logOut = () => {
		setUser(null);
	};

	const signUp = (name: string, email: string, password: string) => {
		setUser({name, email, password});
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
				user,
				logIn,
				logOut,
				signUp,

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
