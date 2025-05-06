import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import StartPage from '../pages/StartPage';
import Layout from '../Layout';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <StartPage />,
          errorElement: <div>404 Not Found</div>,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
          errorElement: <div>404 Not Found</div>,
        },
      ],
    },
  ],
  {
    future: {},
  },
);

export default router;
