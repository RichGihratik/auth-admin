import { Result } from './thunks';

export function isUsersActionSuccess(
  item: unknown,
): item is Omit<Required<Result>, 'error'> {
  return typeof item === 'object' && item !== null && 'list' in item;
}
