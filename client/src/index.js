import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <StrictMode>
    <Router>
      <ColorModeScript />
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

