import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import store from './Store/Store/store.jsx';
import router from './routes.jsx';
import AutoLogin from './Auth/AutoLogin.jsx';

window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AutoLogin>
        <RouterProvider router={router} />
      </AutoLogin>
    </Provider>
  </StrictMode>
)
