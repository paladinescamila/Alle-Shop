import {useState, useContext} from 'react';
import {createContext} from 'react';

interface ContextProps {
	count: number;
	setCount: (count: number) => void;
}

const ShoppingCartContext = createContext<ContextProps>({} as ContextProps);

interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const ShoppingCartProvider = (props: ProviderProps) => {
	const [count, setCount] = useState(0);

	return (
		<ShoppingCartContext.Provider
			value={{
				count,
				setCount,
			}}>
			{props.children}
		</ShoppingCartContext.Provider>
	);
};

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
