import { Result } from './thunks';

export function isAuthSuccess(
  item: unknown,
): item is Omit<Required<Result>, 'error'> {
  return typeof item === 'object' && item !== null && 'user' in item;
}
