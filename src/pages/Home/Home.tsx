import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Card/Card';

export default function Home() {
	const [items, setItems] = useState<Card[]>([]);

	useEffect(() => {
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<Layout>
			<div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
				{items?.map((item) => (
					<Card data={item} />
				))}
			</div>
		</Layout>
	);
}
