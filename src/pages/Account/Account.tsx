import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {UserCircleIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function Account() {
	const {user, logout, deleteAccount} = useMyContext();

	const navigate = useNavigate();

	if (user === null) {
		navigate('/login');
		return null;
	}

	return (
		<Layout>
			<div className='flex flex-col w-80 items-center'>
				<UserCircleIcon className='w-32 h-32 black mb-10' />
				<p className='flex flex-col items-center mb-2'>
					<span className='font-bold'>{user.name || 'You'}</span>
					<span>{user.email}</span>
				</p>
			</div>
			<Link to='/change-password'>
				<Button text='Change Password' secondary />
			</Link>
			<Button text='Log Out' onClick={logout} secondary />
			<Button text='Delete Account' onClick={deleteAccount} danger />
		</Layout>
	);
}
