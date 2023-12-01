import {firestore} from './config';
import {doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';

export const firebaseFirestore = {
	getData: async (id: string) => {
		const docRef = doc(firestore, 'users', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = docSnap.data();

			const userData: FirestoreDocument = {
				id: data?.id || id,
				name: data?.name || '',
				email: data?.email || '',
				favorites: data?.favorites || [],
				cart: data?.cart || [],
				orders: data?.orders || [],
			};

			return userData;
		} else return null;
	},

	createUser: async (newUserData: FirestoreDocument) => {
		const docRef = doc(firestore, 'users', newUserData.id);
		await setDoc(docRef, {
			id: newUserData.id,
			name: newUserData.name,
			email: newUserData.email,
			favorites: newUserData.favorites || [],
			cart: newUserData.cart || [],
			orders: newUserData.orders || [],
		});
	},

	updateProfile: async (userID: string, name: string) => {
		const docRef = doc(firestore, 'users', userID);
		await setDoc(docRef, {name}, {merge: true});
	},

	updateFavorites: async (userID: string, favorites: string[]) => {
		const docRef = doc(firestore, 'users', userID);
		await setDoc(docRef, {favorites}, {merge: true});
	},

	updateCart: async (userID: string, cart: FirestoreCart) => {
		const docRef = doc(firestore, 'users', userID);
		await setDoc(docRef, {cart}, {merge: true});
	},

	updateOrders: async (userID: string, orders: FirestoreOrders) => {
		const docRef = doc(firestore, 'users', userID);
		await setDoc(docRef, {orders}, {merge: true});
	},

	deleteUser: async (userID: string) => {
		const docRef = doc(firestore, 'users', userID);
		await deleteDoc(docRef);
	},
};
