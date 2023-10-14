import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { appTheme } from '../themes';
import '../styles/global.css';


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;