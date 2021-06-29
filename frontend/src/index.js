import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c3f41',
    },
    secondary: {
      main: '#ee190f',
    },
    background: {
      default: '#efefef',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

serviceWorker.register();
