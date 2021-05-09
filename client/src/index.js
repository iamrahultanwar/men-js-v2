import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme} >
      <Router>
        <ColorModeScript />
        <App />
      </Router>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

