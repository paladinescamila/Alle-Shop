import {auth} from './config';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword} from 'firebase/auth';

export const firebaseAuth = {
	login: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
	signup: (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password),
	signout: () => auth.signOut(),
	changePassword: (password: string) => updatePassword(auth.currentUser!, password),
	deleteAccount: () => auth.currentUser?.delete(),
};
