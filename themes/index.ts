import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
			good: {
				main: string;
				contrastText: string;
			};
			warning: {
				main: string;
				contrastText: string;
			};
			danger: {
				main: string;
				contrastText: string;
			};
		},
		dark: {
			main: string;
		}
  }

  interface PaletteOptions {
    status?: {
			good?: {
				main?: string;
				contrastText?: string;
			};
			warning?: {
				main?: string;
				contrastText?: string;
			};
			danger?: {
				main?: string;
				contrastText?: string;
			};
		},
		dark?: {
			main?: string;
		}
  }
}

export const appTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#233450',
			light: '#F4F7FC',
			contrastText: 'white'
		},
		secondary: { main: '#FDB833' },
		status: {
			good: {
				main: '#D5F3E6',
				contrastText: '#004B50'
			},
			warning: {
				main: '#FFF4D9',
				contrastText: '#7A4100'
			},
			danger: {
				main: '#FFE1D9',
				contrastText: '#7A0916'
			},
		},
		dark: { main: '#233450' }
	},
	typography: { fontFamily: 'Poppins' }
});