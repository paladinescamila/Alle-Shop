import Layout from '../../components/Layout/Layout';
import {Link, useNavigate} from 'react-router-dom';
import {useShopiContext} from '../../context';

export default function Account() {
	const {user, logOut} = useShopiContext();

	const navigate = useNavigate();

	if (user === null) {
		navigate('/login');
		return null;
	}

	return (
		<Layout>
			{' '}
			<p>{user.name}</p>
			<p>{user.email}</p>
			<Link to='/login'>
				<button className='bg-black py-3 text-white w-full ' onClick={logOut}>
					Log Out
				</button>
			</Link>
		</Layout>
	);
}
