import {useState, useContext, useEffect, createContext} from 'react';
import {normalizeText, formatText} from '../utils';

interface ContextProps {
	products: Product[];
	categories: Categories;

	loadingProducts: boolean;

	productToShow: Product | undefined;
	openProductDetail: (product: Product) => void;
	closeProductDetail: () => void;

	cartProducts: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;

	isCheckoutSideMenuOpen: boolean;
	openCheckoutSideMenu: () => void;
	closeCheckoutSideMenu: () => void;

	orders: Order[];
	handleCheckout: () => void;
}

const ShoppingCartContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShoppingCartProvider = (props: ProviderProps) => {
	// Products
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Categories>({});
	const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((response) => response.json())
			.then((data) => {
				// Products
				const newProducts: Product[] = data.map((product: Product) => ({
					...product,
					category: normalizeText(product.category),
				}));

				setProducts(newProducts);
				setLoadingProducts(false);

				// Categories
				const map: {[key: string]: number} = {};

				for (let i = 0; i < data.length; i++) {
					const category = data[i].category;

					if (map[category]) map[category]++;
					else map[category] = 1;
				}

				const list = Object.keys(map).sort((a, b) => {
					return map[b] - map[a];
				});

				const newCategories: Categories = {};

				for (const [index, category] of list.entries()) {
					newCategories[normalizeText(category)] = {
						id: normalizeText(category),
						name: formatText(category),
						colorIndex: index,
					};
				}

				setCategories(newCategories);
			})
			.catch((error) => console.log(error));
	}, []);

	const [productToShow, setProductToShow] = useState<Product>();

	const openProductDetail = (product: Product) => {
		setProductToShow(product);
		closeCheckoutSideMenu();
	};

	const closeProductDetail = () => setProductToShow(undefined);

	// Cart
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const addToCart = (product: Product) => setCartProducts([...cartProducts, product]);
	const removeFromCart = (product: Product) =>
		setCartProducts(cartProducts.filter((p) => p.id !== product.id));

	// Checkout side menu
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
			date: new Date(),
			products: cartProducts,
		};

		setOrders([...orders, newOrder]);
		setCartProducts([]);
		closeCheckoutSideMenu();
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				products,
				categories,

				loadingProducts,

				productToShow,
				openProductDetail,
				closeProductDetail,

				cartProducts,
				addToCart,
				removeFromCart,

				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,

				orders,
				handleCheckout,
			}}>
			{props.children}
		</ShoppingCartContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingCartContext = () => useContext(ShoppingCartContext);
