type Order = {
	id: number;
	date: Date;
	products: {
		product: Product;
		quantity: number;
	}[];
};
