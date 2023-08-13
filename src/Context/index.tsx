import {useState, useContext, useEffect} from 'react';
import {createContext} from 'react';
import {normalizeText} from '../utils';

interface ContextProps {
	products: Product[];
	categories: string[];

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
	const [categories, setCategories] = useState<string[]>([]);
	const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

	useEffect(() => {
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
				setLoadingProducts(false);

				const categoriesMap: {[key: string]: number} = {};

				for (let i = 0; i < data.length; i++) {
					const product = data[i];
					const categoryName = normalizeText(product.category.name);

					if (categoriesMap[categoryName]) categoriesMap[categoryName]++;
					else categoriesMap[categoryName] = 1;
				}

				const categoriesList = Object.keys(categoriesMap).sort((a, b) => {
					return categoriesMap[b] - categoriesMap[a];
				});

				setCategories(categoriesList);
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

	// Checkout
	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState<boolean>(false);

	const openCheckoutSideMenu = () => {
		setIsCheckoutSideMenuOpen(true);
		closeProductDetail();
	};

	const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

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
