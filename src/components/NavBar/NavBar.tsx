import React from 'react';
import {NavLink} from 'react-router-dom';
import {ShoppingBagIcon} from '@heroicons/react/24/solid';
import {useShoppingCartContext} from '../../Context';

export default function NavBar() {
	const activeStyle = 'underline underline-offset-4';
	const {count} = useShoppingCartContext();

	return (
		<nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
			<ul className='flex items-center gap-3'>
				<li className='font-semibold text-lg'>
					<NavLink to='/'>Shopi</NavLink>
				</li>
				<li>
					<NavLink to='/' className={({isActive}) => (isActive ? activeStyle : '')}>
						All
					</NavLink>
				</li>
				<li>
					<NavLink to='/clothes' className={({isActive}) => (isActive ? activeStyle : '')}>
						Clothes
					</NavLink>
				</li>
				<li>
					<NavLink to='/electronics' className={({isActive}) => (isActive ? activeStyle : '')}>
						Electronics
					</NavLink>
				</li>
				<li>
					<NavLink to='/furnitures' className={({isActive}) => (isActive ? activeStyle : '')}>
						Furnitures
					</NavLink>
				</li>
				<li>
					<NavLink to='/toys' className={({isActive}) => (isActive ? activeStyle : '')}>
						Toys
					</NavLink>
				</li>
				<li>
					<NavLink to='/others' className={({isActive}) => (isActive ? activeStyle : '')}>
						Others
					</NavLink>
				</li>
			</ul>
			<ul className='flex items-center gap-3'>
				<li className='text-black/60'>camilapaladines27@gmail.com</li>
				<li>
					<NavLink to='my-orders' className={({isActive}) => (isActive ? activeStyle : '')}>
						My orders
					</NavLink>
				</li>
				<li>
					<NavLink to='my-account' className={({isActive}) => (isActive ? activeStyle : '')}>
						My account
					</NavLink>
				</li>
				<li>
					<NavLink to='signin' className={({isActive}) => (isActive ? activeStyle : '')}>
						Sign in
					</NavLink>
				</li>
				<li className='flex items-center'>
					<ShoppingBagIcon className='h-6 w-6 text-black' />
					<div>{count}</div>
				</li>
			</ul>
		</nav>
	);
}
