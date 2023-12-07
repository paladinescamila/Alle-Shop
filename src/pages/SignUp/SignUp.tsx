import {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import {UserIcon, EnvelopeIcon, KeyIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function SignUp() {
	const {user, signup, openAlert, goTo} = useMyContext();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const signupHandler = () => {
		if (password !== confirmPassword) {
			openAlert('Passwords do not match', 'warning');
		} else {
			signup(name, email, password).then(() => {
				setName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
			});
		}
	};

	if (user !== null) {
		goTo('/account');
		return null;
	}

	return (
		<Layout>
			<h1 className='font-medium text-xl text-center mb-6'>Sign Up</h1>
			<form className='flex flex-col w-80' onSubmit={(e) => e.preventDefault()}>
				<div className='w-full relative mb-3'>
					<input
						type='text'
						placeholder='Name'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={name}
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
				<div className='w-full relative mb-3'>
					<input
						type='password'
						placeholder='Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<div className='w-full relative mb-6'>
					<input
						type='password'
						placeholder='Confirm Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
				<Button text='Sign Up' onClick={signupHandler} />
			</form>
		</Layout>
	);
}
