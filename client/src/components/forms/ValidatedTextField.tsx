import { TextField } from '@mui/material';
import { useState, ChangeEvent } from 'react';

const variantOptions = {
  email: {
    name: 'email',
    id: 'email',
    label: 'Email Address',
    type: 'email',
    autoComplete: 'email',
  },
  password: {
    name: 'password',
    id: 'password',
    label: 'Password',
    type: 'password',
  },
  name: {
    name: 'firstName',
    id: 'firstName',
    label: 'Name',
    autoComplete: 'given-name',
  },
} as const;

interface FieldProps {
  variant: keyof typeof variantOptions;
  fallthough?: Record<string, boolean | string>;
  validatedTextChange: (text?: string) => void;
  validator?: (text: string) => boolean;
  errorMessage: string;
}

const commonProps = {
  required: true,
  fullWidth: true,
  variant: 'standard',
} as const;

export default function ValidatedTextField(props: FieldProps) {
  const prop = {
    ...commonProps,
    ...variantOptions[props.variant],
    ...props.fallthough,
  };

  const [error, setError] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const validationResult = !props.validator || props.validator(value);

    if (!validationResult) {
      props.validatedTextChange();
      setError(true);
    } else  {
      props.validatedTextChange(value);
      setError(false);
    }
  }

  return (
    <TextField
      onChange={handleChange}
      {...prop}
      error={error}
      helperText={error ? props.errorMessage : ''}
    />
  );
}
