import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {ShoppingCartIcon, Bars2Icon, XMarkIcon, SwatchIcon} from '@heroicons/react/24/solid';
import {HeartIcon, ShoppingBagIcon} from '@heroicons/react/24/outline';
import {useShopiContext} from '../../Context';
import {useResponsive} from '../../utils';

export default function NavBar() {
	const {categories, cartProducts, isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu} =
		useShopiContext();

	const openCloseCheckoutSideMenu = () => {
		if (isCheckoutSideMenuOpen) closeCheckoutSideMenu();
		else openCheckoutSideMenu();
	};

	const optionClassName = ({isActive}: {isActive: boolean}) => {
		const mainStyle = 'text-wrapping whitespace-nowrap flex gap-2 items-center pb-1 border-b';
		const inactiveStyle = 'border-white hover:border-gray-300';
		const activeStyle = 'border-black hover:border-black';
		return `${mainStyle} ${isActive ? activeStyle : inactiveStyle}`;
	};

	const {isSmallDesktop, isTablet, isSmallTablet, isMobile} = useResponsive();

	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const openMobileMenu = () => setShowMobileMenu(true);
	const closeMobileMenu = () => setShowMobileMenu(false);

	return (
		<nav
			className={`flex justify-between items-center gap-10 fixed z-10 top-0 w-full py-5 ${
				isTablet || isSmallTablet || isMobile ? 'px-5' : 'px-10'
			} text-sm font-light bg-white border-b border-black`}>
			<ul className='flex items-center gap-5'>
				<li className='font-semibold text-lg'>
					<NavLink to='/' className='flex gap-1 items-center'>
						<SwatchIcon className='h-5 w-5 text-black' />
						Shopi
					</NavLink>
				</li>
				{!isSmallTablet && !isMobile && (
					<>
						<li>
							<NavLink to='/' className={optionClassName}>
								All
							</NavLink>
						</li>
						{Object.values(categories)
							.slice(0, 5)
							.map((category) => (
								<li key={category.id}>
									<NavLink to={`/${category.id}`} className={optionClassName}>
										{category.name}
									</NavLink>
								</li>
							))}
					</>
				)}
			</ul>
			<ul className='flex items-center gap-5'>
				{!isSmallDesktop && !isTablet && !isSmallTablet && !isMobile && (
					<>
						<li>
							<NavLink to='favorites' className={optionClassName}>
								<HeartIcon className='h-4 w-4 text-black' />
								Favorites
							</NavLink>
						</li>
						<li>
							<NavLink to='orders' className={optionClassName}>
								<ShoppingBagIcon className='h-4 w-4 text-black' />
								Orders
							</NavLink>
						</li>
					</>
				)}
				<li className='flex items-center cursor-pointer gap-1' onClick={openCloseCheckoutSideMenu}>
					<ShoppingCartIcon className='h-5 w-5 text-black' />
					<div className={`font-medium ${cartProducts.length ? 'flex' : 'hidden'}`}>
						{cartProducts.length}
					</div>
				</li>
				{(isSmallDesktop || isTablet || isSmallTablet || isMobile) && (
					<Bars2Icon className='h-5 w-5 text-black cursor-pointer' onClick={openMobileMenu} />
				)}
			</ul>
			<div
				className={`w-[70vw] h-[100vh] flex flex-col items-end fixed top-0 py-6 px-5 bg-white border-l border-black transition-all duration-300 ${
					(isSmallDesktop || isTablet || isSmallTablet || isMobile) && showMobileMenu
						? 'right-0'
						: 'right-[-70vw]'
				}`}>
				<XMarkIcon className='h-5 w-5 mb-20 text-black cursor-pointer' onClick={closeMobileMenu} />
				{(isSmallTablet || isMobile) && (
					<ul className='w-[70%] mx-auto flex flex-col items-center justify-center gap-5 pb-10 border-b border-gray-300 mb-10'>
						{Object.values(categories).map((category) => (
							<li key={category.id} onClick={closeMobileMenu}>
								<NavLink to={`/${category.id}`} className={optionClassName}>
									{category.name}
								</NavLink>
							</li>
						))}
					</ul>
				)}
				<ul className='w-[70%] mx-auto flex flex-col items-center justify-center gap-5'>
					<li onClick={closeMobileMenu}>
						<NavLink to='favorites' className={optionClassName}>
							<HeartIcon className='h-4 w-4 text-black' />
							Favorites
						</NavLink>
					</li>
					<li onClick={closeMobileMenu}>
						<NavLink to='orders' className={optionClassName}>
							<ShoppingBagIcon className='h-4 w-4 text-black' />
							Orders
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
