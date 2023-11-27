import Card from '../../components/Card/Card';
import Layout from '../../components/Layout/Layout';
import {useMyContext} from '../../context';
import {useResponsive} from '../../utils';

export default function Favorites() {
	const {favorites} = useMyContext();
	const {isDesktop, isSmallDesktop, isTablet, isSmallTablet, isMobile} = useResponsive();

	return (
		<Layout>
			{(isSmallDesktop || isTablet || isSmallTablet || isMobile) && (
				<h1 className='font-medium text-xl mb-10'>Favorites</h1>
			)}

			{favorites.length ? (
				<div
					className={`grid gap-3 justify-items-center w-full ${
						isDesktop
							? 'grid-cols-4'
							: isSmallDesktop
							? 'grid-cols-3'
							: isTablet
							? 'grid-cols-2'
							: 'grid-cols-1'
					}`}>
					{favorites.map((product, index) => (
						<Card key={index} product={product} />
					))}
				</div>
			) : (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					You have no favorites
				</div>
			)}
		</Layout>
	);
}
