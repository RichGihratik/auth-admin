import { Button } from '@mui/material';
import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

import ValidatedTextField from './ValidatedTextField';
import ClosableAlert from './ClosableAlert';
import { RoutePaths } from '@/router';
import {
  useAppDispatch,
  isRequestFailed,
  signin,
  isAuthSuccess,
} from '@/store';

export function SigninForm() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>();

  async function makeRequest() {
    if (email && password) {
      setError(undefined);
      const { payload } = await dispatch(signin({ email, password }));

      if (isAuthSuccess(payload)) {
        navigate(RoutePaths.AdminPanel);
      } else if (isRequestFailed(payload)) {
        setError(payload.error);
      } else {
        setError('Unknown error');
      }
    }
  }

  return (
    <>
      <ClosableAlert message={error} />
      <div className="mt-3 relative flex flex-col gap-5">
        <ValidatedTextField
          variant="email"
          validator={validator.isEmail}
          errorMessage="Please enter correct email"
          validatedTextChange={(text) => setEmail(() => text)}
        />
        <ValidatedTextField
          variant="password"
          errorMessage="Please enter password"
          validatedTextChange={(text) => setPassword(() => text)}
          fallthough={{ autoComplete: 'current-password' }}
        />
        <Button
          sx={{ mt: 5 }}
          disabled={!(email && password)}
          variant="contained"
          onClick={makeRequest}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
