import {useEffect, useState} from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Card/Card';
import {useShoppingCartContext} from '../../Context';
import {normalizeText} from '../../utils';

export default function ProductsList() {
	const {products, categories, loadingProducts, search} = useShoppingCartContext();
	const [productsToShow, setProductsToShow] = useState<Product[]>([]);

	useEffect(() => {
		let searchedProducts: Product[] = [];

		if (search) {
			const normalizedSearch = normalizeText(search);

			searchedProducts = products.filter((product) => {
				const normalizedTitle = normalizeText(product.title);
				const normalizedCategoryName = normalizeText(product.category.name);
				return (
					normalizedTitle.includes(normalizedSearch) ||
					normalizedCategoryName.includes(normalizedSearch)
				);
			});
		} else {
			searchedProducts = products;
		}

		const currentPath = window.location.pathname;
		const subPath = currentPath.split('/')[1];

		if (categories.includes(normalizeText(subPath))) {
			setProductsToShow(
				searchedProducts.filter((product) => {
					const normalizedCategoryName = normalizeText(product.category.name);
					const normalizedSubPath = normalizeText(subPath);
					return normalizedCategoryName.includes(normalizedSubPath);
				})
			);
		} else setProductsToShow(searchedProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, products, window.location.pathname]);

	return (
		<Layout>
			{loadingProducts || !productsToShow.length ? (
				<div className='w-full h-[80vh] max-w-screen-lg flex items-center justify-center font-light text-lg text-gray-500'>
					{loadingProducts
						? 'Getting products...'
						: search
						? `No products found for "${search}"`
						: 'No products'}
				</div>
			) : (
				<div className='grid gap-3 grid-cols-4 w-full max-w-screen-lg justify-items-center'>
					{productsToShow.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			)}
		</Layout>
	);
}
