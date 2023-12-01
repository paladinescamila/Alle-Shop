import Layout from '../../components/Layout/Layout';
import {Link} from 'react-router-dom';
import {
	UserCircleIcon,
	PencilIcon,
	KeyIcon,
	TrashIcon,
	ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function Account() {
	const {user, logout, deleteAccount, goTo} = useMyContext();

	if (user === null) {
		goTo('/login');
		return null;
	}

	const deleteAccountHandler = () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			deleteAccount();
		}
	};

	return (
		<Layout>
			<div className='flex flex-col w-80 items-center border border-white border-b-gray-200 pb-5 mb-5'>
				<UserCircleIcon className='w-32 h-32 mb-10 text-gray-300' />
				<p className='flex flex-col items-center mb-2'>
					<span className='font-bold'>{user.name || 'You'}</span>
					<span className='text-gray-500'>{user.email}</span>
				</p>
			</div>
			<div className='flex flex-col w-80'>
				<Link to='/edit-profile'>
					<button className='flex items-center w-full p-3 transition-colors duration-100 bg-white text-black hover:bg-gray-100'>
						<PencilIcon className='w-5 h-5 mr-2' />
						Edit Profile
					</button>
				</Link>
				<Link to='/change-password'>
					<button className='flex items-center w-full p-3 transition-colors duration-100 bg-white text-black hover:bg-gray-100'>
						<KeyIcon className='w-5 h-5 mr-2' />
						Change Password
					</button>
				</Link>
				<button
					className='flex items-center w-full p-3 transition-colors duration-100 bg-white text-black hover:bg-gray-100'
					onClick={logout}>
					<ArrowLeftOnRectangleIcon className='w-5 h-5 mr-2' />
					Log Out
				</button>
				<button
					className='flex items-center w-full p-3 transition-colors duration-100 bg-white text-red-700 hover:bg-red-50'
					onClick={deleteAccountHandler}>
					<TrashIcon className='w-5 h-5 mr-2' />
					Delete Account
				</button>
			</div>
		</Layout>
	);
}
