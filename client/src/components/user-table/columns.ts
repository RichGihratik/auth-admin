import { TableColumn } from 'react-data-table-component';
import { UserFields, User } from '@/types';

export const columns = [
  {
    name: 'Id',
    selector: (item) => item[UserFields.Id],
    sortable: true,
  },
  {
    name: 'Name',
    selector: (item) => item[UserFields.Name],
    sortable: true,
  },
  {
    name: 'Email',
    selector: (item) => item[UserFields.Email],
    sortable: true,
  },
  {
    name: 'Created At',
    selector: (item) => item[UserFields.CreatedAt].toString(),
    sortable: true,
  },
  {
    name: 'Last Login',
    selector: (item) => item[UserFields.LastLogin].toString(),
    sortable: true,
  },
  {
    name: 'Status',
    selector: (item) => item[UserFields.Status],
  },
] satisfies TableColumn<User>[];
