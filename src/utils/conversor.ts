// Convert data from firestore to data used in the app

export const getFavorites = (favorites: string[], products: Product[]) => {
	const favoriteProducts: Product[] = [];

	for (const favorite of favorites) {
		const product = products.find((p) => p.id === favorite);
		if (product) favoriteProducts.push(product);
	}

	return favoriteProducts;
};

export const getCart = (cart: FirestoreCart, products: Product[]) => {
	const cartItems: CartItem[] = [];

	for (const item of cart) {
		const product = products.find((p) => p.id === item.product);
		if (product) cartItems.push({product, quantity: item.quantity});
	}

	return cartItems;
};

export const getOrders = (orders: FirestoreOrders, products: Product[]) => {
	const mapped = orders.map(({id, date, products: productsID}) => {
		const mappedProducts = productsID.map(({product, quantity}) => {
			const productData = products.find((p) => p.id === product);
			return {...productData, quantity};
		}) as CartItem[];

		return {id, date, products: mappedProducts};
	}) as Order[];

	return mapped.filter((o) => o.id !== undefined);
};

// Convert data from app to data used in firestore
export const getFirestoreFavorites = (favorites: Product[]) => favorites.map((p) => p.id);

export const getFirestoreCart = (cart: CartItem[]) =>
	cart.map(({product, quantity}) => ({product: product.id, quantity}));

export const getFirestoreOrders = (orders: Order[]) =>
	orders.map(({id, date, products}) => ({
		id,
		date,
		products: products.map(({product, quantity}) => ({product: product.id, quantity})),
	}));
