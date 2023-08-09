import {useState, useContext} from 'react';
import {createContext} from 'react';

interface ContextProps {
	productToShow: Card | undefined;
	openProductDetail: (product: Card) => void;
	closeProductDetail: () => void;

	cartProducts: Card[];
	addToCart: (product: Card) => void;
	removeFromCart: (product: Card) => void;

	isCheckoutSideMenuOpen: boolean;
	openCheckoutSideMenu: () => void;
	closeCheckoutSideMenu: () => void;
}

const ShoppingCartContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShoppingCartProvider = (props: ProviderProps) => {
	const [productToShow, setProductToShow] = useState<Card>();
	const openProductDetail = (product: Card) => setProductToShow(product);
	const closeProductDetail = () => setProductToShow(undefined);

	const [cartProducts, setCartProducts] = useState<Card[]>([]);
	const addToCart = (product: Card) => setCartProducts([...cartProducts, product]);
	const removeFromCart = (product: Card) =>
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
