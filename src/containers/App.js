import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Store from '../stores/Store';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Mapper from './mapper';

const theme = createTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#607d8b' },
    untouched: { main: '#A9A9A9' },
  },

  typography: {
    fontFamily: ['Asap', 'cursive'].join(','),
  },

  components: {
    MuiGrid: { defaultProps: { spacing: 2, xs: 12 } },
    MuiSlider: {
      defaultProps: {
        defaultValue: 50,
        color: 'secondary',
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'normal',
        autoComplete: 'off',
      },
    },
    MuiAlert: {
      styleOverrides: {
        icon: { margin: 'auto', marginRight: '10px' },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          // Some CSS
          // backgroundColor: 'black',
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 1,
      sm: 450,
      md: 9999,
      lg: 9999,
      xl: 9999,
    },
  },
});

/**
 * App component
 * Entrypoint for the application
 */
export default class App extends Component {
  store = new Store();

  render() {
    const c = this.props.cookies;
    return (
      <Provider store={this.store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/map" element={<Mapper />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}
