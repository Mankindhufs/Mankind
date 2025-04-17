import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import StartPage from '../pages/StartPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <StartPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ],
  {
    future: {},
  },
);

export default router;
