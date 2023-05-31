import { AccountCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { RoutePaths } from '@/router';
import { User } from '@/types';

export function UserChip({
  profile,
  clickable,
}: {
  profile: User;
  clickable?: boolean;
}) {
  const props = clickable
    ? { clickable: true, component: 'a', href: RoutePaths.AdminPanel }
    : {};

  return (
    <Chip color="primary" icon={<AccountCircle />} label={profile.name} {...props} />
  );
}
