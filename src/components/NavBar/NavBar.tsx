import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {ShoppingCartIcon, Bars2Icon, XMarkIcon} from '@heroicons/react/24/solid';
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
		const mainStyle = 'text-wrapping whitespace-nowrap';
		const activeStyle = 'underline underline-offset-4';
		return isActive ? `${mainStyle} ${activeStyle}` : mainStyle;
	};

	const {isTablet, isSmallTablet, isMobile} = useResponsive();

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
					<NavLink to='/'>Shopi</NavLink>
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
				{!isTablet && !isSmallTablet && !isMobile && (
					<>
						<li>
							<NavLink to='my-orders' className={optionClassName}>
								My orders
							</NavLink>
						</li>
						<li>
							<NavLink to='my-account' className={optionClassName}>
								My account
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
				{(isTablet || isSmallTablet || isMobile) && (
					<Bars2Icon className='h-5 w-5 text-black cursor-pointer' onClick={openMobileMenu} />
				)}
			</ul>

			<div
				className={`w-[70vw] h-[100vh] flex flex-col items-end fixed top-0 py-6 px-5 bg-white border-l border-black transition-all duration-300 ${
					(isTablet || isSmallTablet || isMobile) && showMobileMenu ? 'right-0' : 'right-[-70vw]'
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
						<NavLink to='my-orders' className={optionClassName}>
							My orders
						</NavLink>
					</li>
					<li onClick={closeMobileMenu}>
						<NavLink to='signin' className={optionClassName}>
							Sign in
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
