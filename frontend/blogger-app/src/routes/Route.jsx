import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../pages/MainLayout';
import CreateBlog from '../pages/CreateBlog';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Blogs />,
      },
      {
        path: 'create-blog',
        element: <CreateBlog />,
      },
      {
        path: 'editblog',
        element: <CreateBlog />,
      },
      {
        path: 'blog/:id',
        element: <BlogDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
