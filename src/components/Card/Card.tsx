import React from 'react';
import {useShoppingCartContext} from '../../Context';

interface Props {
	data: Card;
}

export default function Card(props: Props) {
	const {title, images, price, category} = props.data;
	const {count, setCount} = useShoppingCartContext();

	const addToCart = () => {
		setCount(count + 1);
	};

	return (
		<div className='bg-white cursor-pointer w-56 h-60 rounded-lg'>
			<figure className='relative mb-2 w-full h-4/5'>
				<span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
					{category.name}
				</span>
				<img src={images[0]} alt='headphones' className='w-full h-full object-cover rounded-lg' />
				<div
					className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
					onClick={addToCart}>
					+
				</div>
			</figure>
			<p className='flex justify-between'>
				<span className='text-sm font-light'>{title}</span>
				<span className='text-sm font-medium'>${price}</span>
			</p>
		</div>
	);
}
