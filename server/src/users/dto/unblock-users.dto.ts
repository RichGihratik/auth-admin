import { IsInt, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class UnblockUsersDto {
  @IsNotEmpty()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  unblockIds: number[];
}
