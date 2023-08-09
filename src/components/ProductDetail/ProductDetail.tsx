import {XMarkIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';

export default function ProductDetail() {
	const {productToShow, closeProductDetail} = useShoppingCartContext();

	return (
		<aside
			className={`w-[360px] h-[calc(100vh-80px)] flex flex-col fixed right-0 border border-black rounded-lg bg-white ${
				productToShow ? 'flex' : 'hidden'
			}`}>
			<div className='flex justify-between items-center p-6'>
				<h2 className='font-medium text-xl'>Detail</h2>
				<XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={closeProductDetail} />
			</div>
			<figure className='px-6'>
				<img
					src={productToShow?.images[0]}
					alt={productToShow?.title}
					className='w-full rounded-lg'
				/>
				<p className='flex flex-col pt-6'>
					<span className='font-medium text-2xl mb-2'>${productToShow?.price}</span>
					<span className='font-medium text-2md'>{productToShow?.title}</span>
					<span className='font-light text-sm'>{productToShow?.description}</span>
				</p>
			</figure>
		</aside>
	);
}
