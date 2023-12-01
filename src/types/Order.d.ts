type Order = {
	id: string;
	date: string;
	products: {
		product: Product;
		quantity: number;
	}[];
};
