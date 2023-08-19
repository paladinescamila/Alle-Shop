import {useEffect, useState} from 'react';
import Card from '../../components/Card/Card';
import Layout from '../../components/Layout/Layout';
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import {useShopiContext} from '../../context';
import {normalizeText, useResponsive} from '../../utils';

export default function ProductsList() {
	const {products, categories, gettingProducts} = useShopiContext();
	const {isDesktop, isSmallDesktop, isTablet, isSmallTablet, isMobile} = useResponsive();

	const [productsToShow, setProductsToShow] = useState<Product[]>([]);
	const [currentCategory, setCurrentCategory] = useState<string>('All products');
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		let searchedProducts: Product[] = [];

		if (search) {
			const normalizedSearch = normalizeText(search);

			searchedProducts = products.filter((product) => {
				const normalizedTitle = normalizeText(product.title);
				const normalizedCategoryName = normalizeText(product.category);
				const matchName = normalizedTitle.includes(normalizedSearch);
				const matchCategory = normalizedCategoryName.includes(normalizedSearch);
				return matchName || matchCategory;
			});
		} else {
			searchedProducts = products;
		}

		const currentPath = window.location.pathname;
		const subPath = currentPath.split('/')[1];

		if (Object.keys(categories).includes(normalizeText(subPath))) {
			setCurrentCategory(categories[subPath].name);

			setProductsToShow(
				searchedProducts.filter((product) => {
					const normalizedCategoryName = normalizeText(product.category);
					const normalizedSubPath = normalizeText(subPath);
					return normalizedCategoryName === normalizedSubPath;
				})
			);
		} else {
			setCurrentCategory('All products');
			setProductsToShow(searchedProducts);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, products, window.location.pathname]);

	return (
		<Layout>
			{(isSmallTablet || isMobile) && <h1 className='font-medium text-xl mb-5'>{currentCategory}</h1>}
			<div className='w-full relative mb-6'>
				<input
					type='text'
					placeholder='Search'
					className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<MagnifyingGlassIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
			</div>
			{gettingProducts || !productsToShow.length ? (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					{gettingProducts
						? 'Getting products...'
						: search
						? `No products found for "${search}"`
						: 'No products'}
				</div>
			) : (
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
					{productsToShow.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			)}
		</Layout>
	);
}
