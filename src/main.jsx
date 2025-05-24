import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ import this
import App from './App';
import './index.css'; // ✅ import your CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap your app */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
