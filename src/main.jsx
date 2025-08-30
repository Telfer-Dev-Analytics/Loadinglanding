import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// This uses a Vite environment variable to set the correct base path.
// It will be '/' locally and '/telferbta-new-website/' on the live site.
const basename = import.meta.env.PROD ? '/telferbta-new-website/' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
