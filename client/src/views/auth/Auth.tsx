import { Tabs, Tab, Divider, CircularProgress } from '@mui/material';
import { type SyntheticEvent } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';

import { tabs, defaultChild } from './const';

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

  const navigate = useNavigate();

  function handleTabs(_: SyntheticEvent, path: string) {
    navigate(path);
  }

  return (
    <div className="flex flex-1 flex-col h-full items-center justify-stretch px-3">
      {tabs[pathname]?.label ? (
        <>
          <span className="m-10 text-5xl font-bold text-center text-zinc-50 select-none">
            {tabs[pathname].label}
          </span>
          <div className="w-full border-b-2 border-r-2 border-gray-400 shadow-2xl max-w-md bg-zinc-100 rounded-3xl">
            <Tabs value={pathname} onChange={handleTabs} variant="fullWidth">
              {...tabsElement}
            </Tabs>
            <Divider />
            <div className="p-10">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div className='h-100 flex items-center flex-1 text-zinc-50'>
          <CircularProgress size={60} color='inherit'/>
          <Navigate to={defaultChild} replace />
        </div>
      )}
    </div>
  );
}
