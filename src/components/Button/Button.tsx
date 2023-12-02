interface Props {
	text: string;
	onClick?: () => void;
	icon?: React.ReactNode;
	className?: string;
	secondary?: boolean;
	danger?: boolean;
}

export default function Button(props: Props) {
	const {text, onClick, icon, className, secondary, danger} = props;

	return (
		<button
			className={`flex items-center justify-center w-full p-3 border transition-colors duration-100 ${
				danger
					? 'bg-white text-red-700 border-red-700 hover:bg-red-100'
					: secondary
					? 'bg-white text-black border-black hover:bg-black hover:text-white'
					: 'bg-black text-white border-black'
			} ${className}`}
			onClick={onClick}>
			{icon && <span className='mr-2'>{icon}</span>}
			{text}
		</button>
	);
}
