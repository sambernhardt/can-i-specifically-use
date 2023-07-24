import React from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './components/Providers.tsx'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
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
    },
  },
  {
    path: "/feature/:featureId",
    loader: async ({ params }) => {
      return params;
    },
    element: (
      <Providers>
        <App />
      </Providers>
    ),
  },
  // Redirect all other paths to the home page
  {
    path: "*",
    loader: async () => {
      return redirect("/");
    },
    element: (
      <Providers>
        <App />
      </Providers>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
