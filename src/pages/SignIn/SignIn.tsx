import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {UserIcon, EnvelopeIcon, KeyIcon} from '@heroicons/react/24/outline';
import {useShopiContext} from '../../context';

export default function SignIn() {
	const {user, signIn} = useShopiContext();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const navigate = useNavigate();

	useEffect(() => {
		if (user !== null) {
			navigate('/');
		}
	}, [user, navigate]);

	if (user !== null) return null;

	return (
		<Layout>
			<h1 className='font-medium text-xl text-center mb-6'>Sign In</h1>
			<form className='flex flex-col'>
				<div className='w-full relative mb-3'>
					<input
						type='text'
						placeholder='Name'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={email}
						onChange={(e) => setName(e.target.value)}
					/>
					<UserIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
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
				<div className='w-full relative mb-6'>
					<input
						type='password'
						placeholder='Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<Link to='/login'>
					<p className='w-full font-light text-gray-500 mb-5 text-sm text-center'>
						Already have an account?
						<span> </span>
						<span className='text-black underline'>Log In</span>
					</p>
				</Link>
				<Link to='/'>
					<button
						className='bg-black py-3 text-white w-full '
						onClick={() => signIn(name, email, password)}>
						Sign In
					</button>
				</Link>
			</form>
		</Layout>
	);
}
