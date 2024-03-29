import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			const signInResult = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (signInResult?.error) {
				return toast.error('Invalid Credentials');
			}

			loginModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [loginModal, email, password]);

	const onToggle = useCallback(() => {
		if (isLoading) return;

		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal, isLoading]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Input
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				disabled={isLoading}
			/>
			<Input
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
				type='password'
				value={password}
				disabled={isLoading}
			/>
		</div>
	);

	const footerContent = (
		<div className='text-neutral-400 text-center mt-4'>
			<p>
				Dont have an account?
				<span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
					Create an account
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Sign In'
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
			type='submit'
		/>
	);
};

export default LoginModal;
