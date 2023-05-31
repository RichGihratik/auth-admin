import { Button, Divider, Toolbar } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  useAppSelector,
  selectProfile,
  selectProfileLoading,
  useAppDispatch,
  signout,
} from '@/store';
import { RoutePaths } from '@/router';
import { Block, UserChip, UsersTable } from '@/components';

export function AdminPanel() {
  const profile = useAppSelector(selectProfile);
  const profileLoading = useAppSelector(selectProfileLoading);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function signoutClick() {
    await dispatch(signout());
    navigate(RoutePaths.Auth);
  }

  return profileLoading ? (
    <></>
  ) : profile !== undefined ? (
    <div className="md:px-10 px-2 py-10 flex-1 flex flex-col w-full h-full">
      <Block className="flex-1 flex flex-col">
        <Toolbar sx={{ gap: 1 }}>
          <span className="font-bold text-lg sm:text-2xl flex-1 select-none">
            Admin panel
          </span>
          <UserChip profile={profile} />
          <Button
            variant="contained"
            disableElevation
            sx={{ gap: 1, minWidth: 30, borderRadius: 50 }}
            size="small"
            color="error"
            onClick={signoutClick}
          >
            <Logout />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </Toolbar>
        <Divider />
        <div className="flex-1 p-10 h-100 w-100">
          <UsersTable />
        </div>
      </Block>
    </div>
  ) : (
    <Navigate to={RoutePaths.Auth} />
  );
}
