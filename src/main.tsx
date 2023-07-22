import React from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './components/Providers.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    loader: async ({ params }) => {
      return params;
      // return { get(bcdDataAsKeys, selectedFeatureId)};
    },
  },
  {
    path: "/feature/:featureId",
    loader: async ({ params }) => {
      return params;
      // return { get(bcdDataAsKeys, selectedFeatureId)};
    },
    element: (
      <Providers>
        <App />
      </Providers>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
