import { Delete, Block, CheckCircle } from '@mui/icons-material';
import {
  useAppDispatch,
  deleteUsers,
  blockUsers,
  unblockUsers,
  isRequestFailed,
  isUsersActionSuccess,
} from '@/store';
import { useProfileCheck } from './useProfileCheck';

import { IconButton } from '@mui/material';

type Props = {
  ids: number[];
  onStatusChange(status: { isError: boolean; message?: string }): void;
};

export  default function ContextTableActions({ ids, onStatusChange }: Props) {
  const dispatch = useAppDispatch();

  function handleResult(res: unknown, message: string) {
    onStatusChange({ isError: false });
    if (isUsersActionSuccess(res)) {
      onStatusChange({ isError: false, message: message });
    } else {
      onStatusChange({
        isError: true,
        message: isRequestFailed(res) ? res.error : 'Unknown error',
      });
    }
  }

  const profileCheck = useProfileCheck();

  async function block() {
    const { payload } = await dispatch(blockUsers(ids));
    handleResult(payload, 'Users blocked successfuly!');
    profileCheck(payload);
  }

  async function unblock() {
    const { payload } = await dispatch(unblockUsers(ids));
    handleResult(payload, 'Users unblocked successfuly!');
  }

  async function del() {
    const { payload } = await dispatch(deleteUsers(ids));
    handleResult(payload, 'Users deleted successfuly!');
    profileCheck(payload);
  }

  return (
    <>
      <IconButton title="Block users" color="error" onClick={block}>
        <Block />
      </IconButton>
      <IconButton title="Unblock users" color="success" onClick={unblock}>
        <CheckCircle />
      </IconButton>
      <IconButton title="Delete users" color="error" onClick={del}>
        <Delete />
      </IconButton>
    </>
  );
}
