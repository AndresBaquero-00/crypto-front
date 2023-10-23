import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { appTheme } from '../themes';
import '../styles/global.css';
import { ToastProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={appTheme}>
			<ToastProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</ToastProvider>
		</ThemeProvider>
	);
}

export default MyApp;