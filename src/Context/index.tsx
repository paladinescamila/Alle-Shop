import axios from 'axios';
import {useState, useContext, useEffect, createContext} from 'react';
import {normalizeText, formatText} from '../utils';

interface ContextProps {
	products: Product[];
	categories: Categories;
	gettingProducts: boolean;

	favorites: Product[];
	addFavorite: (product: Product) => void;
	removeFavorite: (product: Product) => void;

	productToShow: Product | undefined;
	openProductDetail: (product: Product) => void;
	closeProductDetail: () => void;

	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;

	isCheckoutSideMenuOpen: boolean;
	openCheckoutSideMenu: () => void;
	closeCheckoutSideMenu: () => void;

	orders: Order[];
	handleCheckout: () => void;
}

const ShopiContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShopiProvider = (props: ProviderProps) => {
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
	const [cart, setCart] = useState<Product[]>([]);
	const addToCart = (product: Product) => setCart([...cart, product]);
	const removeFromCart = (product: Product) => setCart(cart.filter((p) => p.id !== product.id));

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
			products: cart.map((p) => ({product: p, quantity: 1})),
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
				const favoritesData = localStorage.getItem('favorites');
				const cartData = localStorage.getItem('cart');
				const ordersData = localStorage.getItem('orders');

				if (favoritesData) setFavorites(JSON.parse(favoritesData));
				if (cartData) setCart(JSON.parse(cartData));
				if (ordersData) setOrders(JSON.parse(ordersData));

				setFirstRender(false);
			});
		} else if (!gettingProducts) {
			localStorage.setItem('favorites', JSON.stringify(favorites));
			localStorage.setItem('cart', JSON.stringify(cart));
			localStorage.setItem('orders', JSON.stringify(orders));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favorites, cart, orders]);

	return (
		<ShopiContext.Provider
			value={{
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

				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,

				orders,
				handleCheckout,
			}}>
			{props.children}
		</ShopiContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShopiContext = () => useContext(ShopiContext);
