import {useState, useContext} from 'react';
import {createContext} from 'react';

interface ContextProps {
	productToShow: Product | undefined;
	openProductDetail: (product: Product) => void;
	closeProductDetail: () => void;

	cartProducts: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;

	isCheckoutSideMenuOpen: boolean;
	openCheckoutSideMenu: () => void;
	closeCheckoutSideMenu: () => void;
}

const ShoppingCartContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShoppingCartProvider = (props: ProviderProps) => {
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

	return (
		<ShoppingCartContext.Provider
			value={{
				productToShow,
				openProductDetail,
				closeProductDetail,

				cartProducts,
				addToCart,
				removeFromCart,

				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,
			}}>
			{props.children}
		</ShoppingCartContext.Provider>
	);
};

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
