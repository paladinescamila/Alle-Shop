type FirestoreCart = {
	product: string;
	quantity: number;
}[];

type FirestoreOrders = {
	id: string;
	date: firebase.firestore.Timestamp;
	products: {
		product: string;
		quantity: number;
	}[];
}[];

type FirestoreDocument = {
	id: string;
	name: string;
	email: string;
	favorites: string[];
	cart: FirestoreCart;
	orders: FirestoreOrders;
};
