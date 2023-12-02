import {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import {EnvelopeIcon, KeyIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function LogIn() {
	const {user, login, openAlert} = useMyContext();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const afterLogin = () => {
		setEmail('');
		setPassword('');
	};

	const loginHandler = () => {
		if (email === '' || password === '') {
			openAlert('Please fill all fields', 'warning');
			return;
		}

		login(email, password).then(afterLogin);
	};

	if (user !== null) return null;

	return (
		<Layout>
			<h1 className='font-medium text-xl text-center mb-6'>Log In</h1>
			<form className='flex flex-col w-80' onSubmit={(e) => e.preventDefault()}>
				<div className='w-full relative mb-3'>
					<input
						type='text'
						placeholder='Email'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<EnvelopeIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<div className='w-full relative mb-5'>
					<input
						type='password'
						placeholder='Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<Link to='/signup'>
					<p className='w-full font-light text-gray-500 mb-5 text-sm text-center'>
						Don't have an account?
						<span> </span>
						<span className='text-black underline'>Sign Up</span>
					</p>
				</Link>
				<Button text='Log In' onClick={loginHandler} />
			</form>
		</Layout>
	);
}
