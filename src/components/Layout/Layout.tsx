import React from 'react';
import {useResponsive} from '../../utils';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function Layout(props: Props) {
	const {isDesktop, isSmallDesktop, isTablet} = useResponsive();

	return (
		<div
			className={`flex flex-col items-center justify-center mx-auto mt-20 py-10 ${
				isDesktop
					? 'max-w-screen-lg'
					: isSmallDesktop
					? 'max-w-screen-md'
					: isTablet
					? 'px-10'
					: 'px-5 py-5'
			} ${props.className || ''}`}>
			{props.children}
		</div>
	);
}
