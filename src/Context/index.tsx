import {useState, useContext, useEffect} from 'react';
import {createContext} from 'react';

interface ContextProps {
	products: Product[];

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
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => console.log(error));
	}, []);

	const [productToShow, setProductToShow] = useState<Product>();
	const openProductDetail = (product: Product) => setProductToShow(product);
	const closeProductDetail = () => setProductToShow(undefined);

	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const addToCart = (product: Product) => setCartProducts([...cartProducts, product]);
	const removeFromCart = (product: Product) =>
		setCartProducts(cartProducts.filter((p) => p.id !== product.id));

	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState<boolean>(false);
	const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
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
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				products,
				
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
