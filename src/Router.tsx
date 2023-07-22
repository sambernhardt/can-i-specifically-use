import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async ({ params }) => {
      return params;
    },
  },
  {
    path: "/feature/:featureId",
    loader: async ({ params }) => {
      return params;
    },
    element: <App />,
  },
]);


const Router = () => {
  
  return (
    <RouterProvider router={router} />
  );
};
export default Router