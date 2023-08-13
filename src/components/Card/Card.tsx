import {PlusIcon, CheckIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';
import React from 'react';

interface Props {
	product: Product;
}

export default function Card(props: Props) {
	const {title, images, price, category} = props.product;
	const {
		productToShow,
		openProductDetail,
		closeProductDetail,
		cartProducts,
		addToCart,
		removeFromCart,
		openCheckoutSideMenu,
	} = useShoppingCartContext();
	const productWasAdded = cartProducts.find((product) => product.id === props.product.id);
	const productIsSelected = productToShow?.id === props.product.id;

	const openProduct = () => {
		closeProductDetail();

		if (!productIsSelected) {
			setTimeout(() => {
				openProductDetail(props.product);
			}, 300);
		}
	};

	const addOrRemoveToCart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();

		if (productWasAdded) removeFromCart(props.product);
		else {
			addToCart(props.product);
			openCheckoutSideMenu();
		}
	};

	return (
		<div
			className={`cursor-pointer w-60 border transition-all duration-300 group ${
				productIsSelected ? 'border-black' : 'border-white'
			}`}
			onClick={openProduct}>
			<figure className='relative mb-2'>
				<span className='absolute bottom-0 left-0 bg-white/70 text-black text-xs m-2 px-3 py-0.5 rounded-lg'>
					{category.name}
				</span>
				<img src={images[0]} alt={title} className='w-full h-60 object-cover' />
				<div
					className={`absolute top-2 right-2 ${
						productWasAdded ? 'flex' : 'hidden'
					} justify-center items-center h-6 cursor-pointer group-hover:flex ${
						productWasAdded ? 'bg-black' : 'bg-white'
					}`}
					onClick={addOrRemoveToCart}>
					{productWasAdded ? null : <p className='text-sm font-light mx-1'>Add to cart</p>}
					{productWasAdded ? (
						<CheckIcon className='h-6 w-6 text-white' />
					) : (
						<PlusIcon className='h-6 w-6 text-black' />
					)}
				</div>
			</figure>
			<p className={`flex justify-between gap-2 p-2`}>
				<span className='text-sm font-light'>{title}</span>
				<span className='text-sm font-medium'>${price}</span>
			</p>
		</div>
	);
}
