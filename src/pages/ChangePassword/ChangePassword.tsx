import {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import {KeyIcon, ArrowLeftIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function ChangePassword() {
	const {changePassword, goTo, openAlert} = useMyContext();

	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

	const changePasswordHandler = () => {
		if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
			openAlert('Please fill all fields', 'warning');
			return;
		}

		if (newPassword !== confirmNewPassword) {
			openAlert('Passwords do not match', 'warning');
			return;
		}

		changePassword(newPassword).then(() => {
			setOldPassword('');
			setNewPassword('');
			setConfirmNewPassword('');
			goTo('/account');
		});
	};

	return (
		<Layout>
			<h1 className='font-medium text-xl mb-6 w-80 flex'>
				<ArrowLeftIcon
					className='w-6 inline-block mr-2 text-gray-400 hover:text-black cursor-pointer'
					onClick={() => goTo('/account')}
				/>
				<span className='text-center'>Change Password</span>
			</h1>
			<form className='flex flex-col w-80' onSubmit={(e) => e.preventDefault()}>
				<div className='w-full relative mb-3'>
					<input
						type='password'
						placeholder='Old Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<div className='w-full relative mb-3'>
					<input
						type='password'
						placeholder='New Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<div className='w-full relative mb-5'>
					<input
						type='password'
						placeholder='Confirm New Password'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={confirmNewPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
					/>
					<KeyIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<Button text='Change' onClick={changePasswordHandler} />
			</form>
		</Layout>
	);
}
