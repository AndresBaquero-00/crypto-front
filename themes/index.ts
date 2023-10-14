import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
			good: string;
			danger: string;
		},
		dark: {
			main: string;
		}
  }

  interface PaletteOptions {
    status?: {
			good?: string;
			danger?: string;
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
			main: '#DB2955',
			contrastText: 'white'
		},
		secondary: {
			main: '#FDB833',
		},
		status: {
			good: '#29A071',
			danger: '#E53935'
		},
		dark: {
			main: '#17171B'
		}
	},
	typography: {
		fontFamily: 'Poppins'
	}
});