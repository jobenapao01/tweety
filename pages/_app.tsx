import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import EditModal from '@/components/modals/EditModal';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Tweety</title>
				<meta name='description' content=' clone for practice' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Toaster />
			<EditModal />
			<RegisterModal />
			<LoginModal />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
