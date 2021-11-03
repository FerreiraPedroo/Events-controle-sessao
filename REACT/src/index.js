import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PageProvider } from "./context/context";
import './styles/index.css';
import ChegueiDigital from './cheguei';


ReactDOM.render(
  <React.StrictMode>
      <PageProvider>
        <BrowserRouter>
          <ChegueiDigital/>
        </BrowserRouter>
      </PageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

