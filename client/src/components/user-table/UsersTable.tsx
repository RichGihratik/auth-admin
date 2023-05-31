import DataTable from 'react-data-table-component';
import { CircularProgress, Typography, Checkbox, colors } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import {
  useAppSelector,
  selectUsers,
  selectUsersLoading,
  useAppDispatch,
  refreshUsers,
} from '@/store';
import { columns } from './columns';
import { UserStatus, User, UserFields } from '@/types';
import ContextTableActions from './ContextTableActions';
import UsersSnackBar from './UsersSnackBar';
import TableActions from './TableActions';

export function UsersTable() {
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);
  const dispatch = useAppDispatch();

  const [ids, setIds] = useState<number[]>([]);

  const handleSelect = useCallback((state: { selectedRows: User[] }) => {
    setIds(state.selectedRows.map((row) => row[UserFields.Id]));
  }, []);

  const [status, setStatus] = useState<{ isError: boolean; message?: string }>({
    isError: false,
  });

  const [firstFetch, setFirstFetch] = useState(true);

  useEffect(() => {
    if (users === undefined && !loading && firstFetch) {
      dispatch(refreshUsers());
      setFirstFetch(false);
    }
  }, [users, loading, firstFetch, dispatch]);

  return (
    <div className="flex flex-col justify-center h-100 w-100 rounded-2xl">
      <>
        <UsersSnackBar isError={status.isError} message={status.message} />
        <DataTable
          noContextMenu={loading || users === undefined}
          fixedHeader
          title={
            <Typography variant="h6">
              Users <CircularProgress color="primary" size="small" />
            </Typography>
          }
          progressPending={loading}
          progressComponent={
            <div className='flex items-center justify-center h-40'>
              <CircularProgress />
            </div>
          }
          columns={columns}
          data={users ?? []}
          selectableRows
          // From official docs
          // https://react-data-table-component.netlify.app/?path=/docs/ui-library-material-ui-table--table#make-our-table-material-design
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          selectableRowsComponent={Checkbox}
          conditionalRowStyles={[
            {
              when: (data) => data.status === UserStatus.Active,
              classNames: ['bg-green-500'],
              style: {
                backgroundColor: colors.green[500],
              },
            },
            {
              when: (data) => data.status === UserStatus.Blocked,
              classNames: ['bg-red-500'],
              style: {
                backgroundColor: colors.red[500],
              },
            },
          ]}
          onSelectedRowsChange={handleSelect}
          contextActions={
            <ContextTableActions
              onStatusChange={(status) => setStatus(status)}
              ids={ids}
            />
          }
          actions={<TableActions />}
        />
      </>
    </div>
  );
}
