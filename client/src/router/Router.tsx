import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { RoutePaths } from './routes';
import { AdminPanel, Auth, authChildren } from '@/views';

const router = createBrowserRouter([
  {
    path: RoutePaths.Landing,
    element: <AdminPanel />,
  },
  {
    path: RoutePaths.AdminPanel,
    element: <AdminPanel />,
  },
  {
    path: RoutePaths.Auth,
    element: <Auth />,
    children: authChildren,
  },
]);

export function Router() {
  return <RouterProvider router={router} />
}