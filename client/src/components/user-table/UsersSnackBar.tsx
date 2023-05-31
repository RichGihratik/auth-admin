import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

type Props = {
  isError: boolean;
  message?: string;
};

export default function UsersSnackBar(props: Props) {
  const { message, isError } = props;
  const isEmpty = message === undefined;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!isEmpty);
  }, [message, isError]);

  return message ? (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={isError ? 'error' : 'success'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
}
