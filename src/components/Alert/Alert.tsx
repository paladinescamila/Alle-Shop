import {CheckIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {QuestionMarkCircleIcon, ExclamationCircleIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function Alert() {
	const {alert, showAlert, closeAlert} = useMyContext();

	const onAcceptHandler = () => {
		alert.onAccept();
		closeAlert();
	};

	const onCancelHandler = () => {
		alert.onCancel();
		closeAlert();
	};

	return (
		<div
			className={`fixed w-[300px] top-0 flex justify-center items-center z-50 p-5
		transition-all duration-500 ease-in-out
		 ${showAlert ? 'right-0' : 'right-[-300px]'}`}>
			<div
				className={`border px-5 py-4 flex gap-3 justify-center relative ${
					alert.type === 'question'
						? 'flex-col w-full  bg-sky-50 border-sky-700'
						: alert.type === 'success'
						? 'flex-row bg-green-50 border-green-700'
						: alert.type === 'error'
						? 'flex-row bg-red-50 border-red-700'
						: 'flex-row bg-yellow-50 border-yellow-700'
				}`}>
				<div className='flex justify-center items-center'>
					{alert.type === 'question' && (
						<QuestionMarkCircleIcon className='h-12 w-12 text-sky-700' />
					)}
					{alert.type === 'success' && <CheckIcon className='h-8 w-8 text-green-700' />}
					{alert.type === 'error' && <XMarkIcon className='h-8 w-8 text-red-700' />}
					{alert.type === 'warning' && (
						<ExclamationCircleIcon className='h-8 w-8 text-yellow-700' />
					)}
				</div>
				<p
					className={`flex items-center justify-center text-sm
                    ${
						alert.type === 'question'
							? ' text-sky-700'
							: alert.type === 'success'
							? 'text-green-700'
							: alert.type === 'error'
							? 'text-red-700'
							: 'text-yellow-700'
					}
                `}>
					{alert.text}
				</p>
				{alert.type === 'question' && (
					<div className='flex justify-center mt-5 gap-3'>
						<button
							className='w-full py-2 border border-sky-700 text-sm text-white bg-sky-700 hover:bg-sky-800 transition-all duration-300 ease-in-out'
							onClick={onAcceptHandler}>
							Accept
						</button>
						<button
							className='w-full py-2 border border-sky-700 text-sm text-sky-700 hover:bg-sky-100 transition-all duration-300 ease-in-out'
							onClick={onCancelHandler}>
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
