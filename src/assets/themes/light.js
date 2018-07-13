import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e3f2fd',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fbbcd0',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
		},
		print: {
      light: '#F3E5F5',
      main: '#9C27B0',
      dark: '#7B1FA2',
      contrastText: '#fff',
		},
    excel: {
      light: '#E8F5E9',
      main: '#4CAF50',
      dark: '#2E7D32',
      contrastText: '#fff',      
    },
    json: {
      light: '#FFF9C4',
      main: '#FDD835',
      dark: '#FFC107',
      contrastText: '#222',      
		},
		pdf: {
      light: '#FFEBEE',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: '#fff',      
		},
		firebase: {
      light: '#FFF3E0',
      main: '#FF9800',
      dark: '#F57C00',
      contrastText: '#fff',      
    },
    teal: {
      light: '#E0F2F1',
      main: '#009688',
      dark: '#00796B',
      contrastText: '#fff',      
    },
    lightGreen: {
      light: '#F1F8E9',
      main: '#8BC34A',
      dark: '#689F38',
      contrastText: '#333',      
    },
    lime: {
      light: '#F9FBE7',
      main: '#CDDC39',
      dark: '#AFB42B',
      contrastText: '#333',      
    }
  },
});

export default theme;
