interface Props {
	text: string;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
}

export default function Button(props: Props) {
	const {text, onClick, secondary, danger} = props;

	return (
		<button
			className={`w-full py-3 bg-black text-white border border-black
		${secondary ? 'bg-white text-black' : ''}
		${danger ? 'bg-red-200 text-red-700 border-none' : ''}
		`}
			onClick={onClick}>
			{text}
		</button>
	);
}
