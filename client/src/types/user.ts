export enum UserStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED'
}

export enum UserFields {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  LastLogin = 'lastLogin',
  CreatedAt = 'createdAt',
  Status = 'status'
}

export interface User {
  [UserFields.Id]: number;
  [UserFields.Name]: string;
  [UserFields.Email]: string;
  [UserFields.LastLogin]: Date;
  [UserFields.CreatedAt]: Date;
  [UserFields.Status]: UserStatus
}
