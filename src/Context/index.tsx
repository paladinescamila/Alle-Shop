import {useState, useContext} from 'react';
import {createContext} from 'react';

interface ContextProps {
	count: number;
	setCount: (count: number) => void;

	productToShow: Card | undefined;
	openProductDetail: (product: Card) => void;
	closeProductDetail: () => void;
}

const ShoppingCartContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShoppingCartProvider = (props: ProviderProps) => {
	const [count, setCount] = useState(0);

	const [productToShow, setProductToShow] = useState<Card>();
	const openProductDetail = (product: Card) => setProductToShow(product);
	const closeProductDetail = () => setProductToShow(undefined);

	return (
		<ShoppingCartContext.Provider
			value={{
				count,
				setCount,

				productToShow,
				openProductDetail,
				closeProductDetail,
			}}>
			{props.children}
		</ShoppingCartContext.Provider>
	);
};

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
