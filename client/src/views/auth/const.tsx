import { Key, Person } from '@mui/icons-material';
import { RouteObject } from 'react-router-dom';

import { SignupForm } from '@/components';
import { RoutePaths } from '@/router';

export const defaultChild = getFullpath('/signin');

export const tabs = {
  [getFullpath('/signin')]: {
    id: 0,
    icon: <Key />,
    label: 'Sign in',
    element: <></>,
  },
  [getFullpath('/signup')]: {
    id: 1,
    icon: <Person />,
    label: 'Sign up',
    element: <SignupForm />,
  },
};

export function getFullpath(path: string) {
  return RoutePaths.Auth + path;
}

export const routeChildren: RouteObject[] = Object.entries(tabs).map(
  ([path, tab]) => {
    return { path, element: tab.element };
  },
);
