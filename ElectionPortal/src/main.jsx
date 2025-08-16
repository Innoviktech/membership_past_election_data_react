import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import store from './Store/Store/store.jsx';
import router from './routes.jsx';

window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
