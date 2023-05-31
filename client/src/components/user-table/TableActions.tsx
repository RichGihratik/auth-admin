import { Refresh } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  useAppDispatch,
  refreshUsers,
} from '@/store';
import { useProfileCheck } from './useProfileCheck';

export  default function TableActions() {
  const dispatch = useAppDispatch();
  const profileCheck = useProfileCheck();

  async function refreshClick() {
    const { payload } = await dispatch(refreshUsers());
    profileCheck(payload);
  }

  return (
    <IconButton title="Refresh" color="primary" onClick={refreshClick}>
      <Refresh />
    </IconButton>
  );
}
