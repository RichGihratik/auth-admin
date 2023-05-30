import { Button } from '@mui/material';
import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

import ValidatedTextField from './ValidatedTextField';
import ClosableAlert from './ClosableAlert';
import { RoutePaths } from '@/router';
import {
  useAppDispatch,
  signup,
  isAuthDispatchSuccess,
  isAuthDispatchFailure
} from '@/store';

export function SignupForm() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  async function makeRequest() {
    if (email && password && name) {
      setError(undefined);
      const { payload } = await dispatch(signup({ email, name, password }));

      if (isAuthDispatchSuccess(payload)) {
        navigate(RoutePaths.AdminPanel);
      } else if (isAuthDispatchFailure(payload)) {
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
          variant="name"
          validator={validator.isAlpha}
          errorMessage="Please enter correct name"
          validatedTextChange={(text) => setName(text)}
        />
        <ValidatedTextField
          variant="email"
          validator={validator.isEmail}
          errorMessage="Please enter correct email"
          validatedTextChange={(text) => setEmail(text)}
        />
        <ValidatedTextField
          variant="password"
          validator={(text) => !validator.isEmpty(text)}
          errorMessage="Please enter password"
          validatedTextChange={(text) => setPassword(text)}
        />
        <Button
          sx={{ mt: 5 }}
          disabled={!(email && password && name)}
          variant="contained"
          onClick={makeRequest}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
