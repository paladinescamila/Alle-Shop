type Order = {
	id: number;
	date: string;
	products: {
		product: Product;
		quantity: number;
	}[];
};
