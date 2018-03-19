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
      light: '#FFEBEE',
      main: '#F44336',
      dark: '#D32F2F',
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
		pdf: {
      light: '#FFEBEE',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: '#fff',      
		},
		firebase: {
      light: '#fbbcd0',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',      
		}
  },
});

export default theme;
