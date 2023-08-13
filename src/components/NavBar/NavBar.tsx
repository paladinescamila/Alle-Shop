import {NavLink} from 'react-router-dom';
import {ShoppingCartIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';

export default function NavBar() {
	const {
		categories,
		cartProducts,
		isCheckoutSideMenuOpen,
		openCheckoutSideMenu,
		closeCheckoutSideMenu,
		search,
		setSearch,
	} = useShoppingCartContext();

	const openCloseCheckoutSideMenu = () => {
		if (isCheckoutSideMenuOpen) closeCheckoutSideMenu();
		else openCheckoutSideMenu();
	};

	const optionClassName = ({isActive}: {isActive: boolean}) => {
		const mainStyle = 'text-wrapping whitespace-nowrap';
		const activeStyle = 'underline underline-offset-4';
		return isActive ? `${mainStyle} ${activeStyle}` : mainStyle;
	};

	return (
		<nav className='flex justify-between items-center gap-10 fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white border-b border-black'>
			<ul className='flex items-center gap-5'>
				<li className='font-semibold text-lg'>
					<NavLink to='/'>Shopi</NavLink>
				</li>
				<li>
					<NavLink to='/' className={optionClassName}>
						All
					</NavLink>
				</li>
				{categories.map((category) => (
					<li key={category}>
						<NavLink to={`/${category}`} className={optionClassName}>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</NavLink>
					</li>
				))}
			</ul>
			<div className='w-full relative'>
				<input
					type='text'
					placeholder='Search'
					className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-gray-100 border-b border-transparent focus:border-gray-300'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<MagnifyingGlassIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
			</div>
			<ul className='flex items-center gap-5'>
				<li>
					<NavLink to='my-orders' className={optionClassName}>
						My orders
					</NavLink>
				</li>
				<li>
					<NavLink to='signin' className={optionClassName}>
						Sign in
					</NavLink>
				</li>
				<li className='flex items-center cursor-pointer gap-1' onClick={openCloseCheckoutSideMenu}>
					<ShoppingCartIcon className='h-5 w-5 text-black' />
					<div className={`font-medium ${cartProducts.length ? 'flex' : 'hidden'}`}>
						{cartProducts.length}
					</div>
				</li>
			</ul>
		</nav>
	);
}
