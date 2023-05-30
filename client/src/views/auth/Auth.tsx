import { Tabs, Tab, Divider, Chip } from '@mui/material';
import { Person } from '@mui/icons-material';
import { type SyntheticEvent } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';

import { tabs, defaultChild } from './const';
import { useAppSelector, selectProfile } from '@/store';
import { RoutePaths } from '@/router';

const tabsElement = Object.entries(tabs).map(([path, tab]) => (
  <Tab
    icon={tab.icon}
    value={path}
    iconPosition="start"
    label={tab.label}
    key={tab.id}
  />
));



export function Auth() {
  const { pathname } = useLocation();

  const profile = useAppSelector(selectProfile);

  const navigate = useNavigate();

  function handleTabs(_: SyntheticEvent, path: string) {
    navigate(path);
  }

  return (
    <div className="flex flex-1 flex-col h-full items-center justify-stretch p-3 gap-5">
      {tabs[pathname]?.label ? (
        <>
          <span className="mt-10 text-5xl font-bold text-center text-zinc-50 select-none">
            {tabs[pathname].label}
          </span>
          {profile !== undefined ? (
            <span className="text-xl font-bold text-center text-zinc-50 select-none">
              Or continue as{' '}
              <Chip
                color="primary"
                component="a"
                clickable
                href={RoutePaths.AdminPanel}
                icon={<Person />}
                label={profile.name}
              />
            </span>
          ) : (
            <></>
          )}
          <div className="mt-5 w-full border-b-2 border-r-2 border-gray-400 shadow-2xl max-w-sm bg-zinc-100 rounded-3xl">
            <Tabs value={pathname} onChange={handleTabs} variant="fullWidth">
              {...tabsElement}
            </Tabs>
            <Divider />
            <div className="py-5 px-10">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={defaultChild} replace />
      )}
    </div>
  );
}
