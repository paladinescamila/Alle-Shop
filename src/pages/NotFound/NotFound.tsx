import Layout from '../../components/Layout/Layout';
import {Link} from 'react-router-dom';

export default function NotFound() {
	return (
		<Layout className='w-full h-[80vh] max-w-screen-lg flex gap-3 items-center justify-center'>
			<h1 className='text-7xl font-medium text-gray-500'>404</h1>
			<p className='text-xl font-light text-gray-400'>Page not found</p>
			<Link to='/' className='text-lg font-light border border-gray-700 text-gray-700 px-10 py-2 mt-20'>
				Go back home
			</Link>
		</Layout>
	);
}
