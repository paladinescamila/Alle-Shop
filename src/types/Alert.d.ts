type Alert = {
	text: string;
	type: 'success' | 'error' | 'question' | 'warning';
	onAccept: () => void;
	onCancel: () => void;
};
