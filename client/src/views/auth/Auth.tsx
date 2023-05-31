import { Tabs, Tab, Divider } from '@mui/material';
import { type SyntheticEvent } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';

import { Block, UserChip } from '@/components';
import { useAppSelector, selectProfile } from '@/store';
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

  const profile = useAppSelector(selectProfile);

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
              Or continue as <UserChip profile={profile} clickable />
            </span>
          ) : (
            <></>
          )}
          <Block className="mt-5 max-w-sm">
            <Tabs value={pathname} onChange={handleTabs} variant="fullWidth">
              {...tabsElement}
            </Tabs>
            <Divider />
            <div className="py-5 px-10">
              <Outlet />
            </div>
          </Block>
        </>
      ) : (
        <Navigate to={defaultChild} replace />
      )}
    </div>
  );
}
