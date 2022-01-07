import React from 'react';
import ReactDOM from 'react-dom';
import App from './code/App';
import { BrowserRouter } from "react-router-dom";
import {GlobalStyle} from "./code/Style"

ReactDOM.render(
  <BrowserRouter>
  <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
