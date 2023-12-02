type FirestoreCart = {
	productID: string;
	quantity: number;
}[];

type FirestoreOrders = {
	id: string;
	date: firebase.firestore.Timestamp;
	products: {
		productID: string;
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
