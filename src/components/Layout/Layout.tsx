import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function Layout(props: Props) {
	return <div className='flex flex-col items-center mt-20'>{props.children}</div>;
}
