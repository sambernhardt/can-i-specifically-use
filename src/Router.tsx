import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { get } from 'lodash';
import { bcdDataAsKeys } from './data';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <App />,
  },
]);


const Router = () => {
  
  return (
    <RouterProvider router={router} />
  );
};
export default Router