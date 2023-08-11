import {useEffect, useState} from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Card/Card';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import CheckoutSideMenu from '../../components/CheckoutSideMenu/CheckoutSideMenu';
import {useShoppingCartContext} from '../../Context';
import {normalizeText} from '../../utils';

export default function Home() {
	const {products} = useShoppingCartContext();

	const [productsToShow, setProductsToShow] = useState<Product[]>([]);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		if (search) {
			const normalizedSearch = normalizeText(search);
			const filteredProducts = products.filter((product) => {
				const normalizedTitle = normalizeText(product.title);
				const normalizedCategoryName = normalizeText(product.category.name);
				return (
					normalizedTitle.includes(normalizedSearch) ||
					normalizedCategoryName.includes(normalizedSearch)
				);
			});

			setProductsToShow(filteredProducts);
		} else {
			setProductsToShow(products);
		}
	}, [search, products]);

	return (
		<Layout>
			<div className='flex items-center justify-center w-80 mb-4'>
				<h1 className='font-medium text-xl'>All products</h1>
			</div>
			<input
				type='text'
				placeholder='Search'
				className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className='grid gap-2 grid-cols-4 w-full max-w-screen-lg'>
				{productsToShow.length > 0 ? (
					productsToShow.map((product) => <Card key={product.id} product={product} />)
				) : (
					<p>{search ? 'No products found' : 'No products available'}</p>
				)}
			</div>
			<ProductDetail />
			<CheckoutSideMenu />
		</Layout>
	);
}
