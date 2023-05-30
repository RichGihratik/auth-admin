import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';

import { Router } from './router';
import { store } from './store';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 60,
        },
      },
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
