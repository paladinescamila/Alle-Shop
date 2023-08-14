type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
};

type Order = {
	id: number;
	date: Date;
	products: Product[];
};
