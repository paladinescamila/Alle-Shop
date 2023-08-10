type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: {
		id: number;
		name: string;
		image: string;
		creationAt: string;
		updatedAt: string;
	};
};

type Order = {
	id: number;
	date: Date;
	products: Product[];
};
