import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PanelCuentas } from './cuenta/cuenta';
import PanelMovimientos, { FormaMovimiento, Loader } from './movimiento/movimiento';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <PanelCuentas />
      },
      {
        path: "movimientos/",
        element: <PanelMovimientos _id="panel_1"/>,
        children: [
          {
            path: "nuevo/:tipo",
            loader: Loader,
            element: <FormaMovimiento />
          }
        ]
      }
    ]
  }
]);



root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

