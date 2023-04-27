import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import AppBody from './components/AppBody';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: "/to-do-list/App",
    element: <AppBody />,
  },
  {
    path: "/to-do-list/CreateAccount",
    element: <CreateAccount />,
  },
  {
    path: "/to-do-list/ForgotPassword",
    element: <ForgotPassword />,
  },  
  {
    path: "/to-do-list",
    element: <App />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
