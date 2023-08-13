import React from 'react';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function Layout(props: Props) {
	return (
		<div className={`flex flex-col items-center mt-20 py-10 ${props.className || ''}`}>
			{props.children}
		</div>
	);
}
