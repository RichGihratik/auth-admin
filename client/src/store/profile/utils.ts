import { Result } from './thunks';

export function isAuthSuccess(
  item: unknown,
): item is Omit<Required<Result>, 'error'> {
  return typeof item === 'object' && item !== null && 'user' in item;
}

export function isAuthFailure(
  item: unknown,
): item is Omit<Required<Result>, 'user'> {
  return typeof item === 'object' && item !== null && 'error' in item;
}
