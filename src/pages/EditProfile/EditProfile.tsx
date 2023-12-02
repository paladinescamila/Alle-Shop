import {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import {UserIcon, ArrowLeftIcon} from '@heroicons/react/24/outline';
import {useMyContext} from '../../context';

export default function EditProfile() {
	const {user, editProfile, goTo, openAlert} = useMyContext();

	const [name, setName] = useState<string>(user?.name || '');

	const editProfileHandler = () => {
		if (name === '') {
			openAlert('Please fill all fields', 'warning');
			return;
		}

		editProfile(name).then(() => {
			setName('');
			goTo('/account');
		});
	};

	return (
		<Layout>
			<h1 className='font-medium text-xl mb-6 w-80'>
				<ArrowLeftIcon
					className='w-6 inline-block mr-2 text-gray-400 hover:text-black cursor-pointer'
					onClick={() => goTo('/account')}
				/>
				<span className='text-center'>Edit Profile</span>
			</h1>
			<form className='flex flex-col w-80' onSubmit={(e) => e.preventDefault()}>
				<div className='w-full relative mb-3'>
					<input
						type='text'
						placeholder='Name'
						className='w-full p-2 pl-9 focus:outline-none font-light transition-colors duration-300 bg-white border border-gray-300 focus:bg-gray-50'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<UserIcon className='w-5 h-full text-gray-400 absolute left-2 top-0 my-auto' />
				</div>
				<Button text='Change' onClick={editProfileHandler} />
			</form>
		</Layout>
	);
}
