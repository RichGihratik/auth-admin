import { IsInt, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class DeleteUsersDto {
  @IsNotEmpty()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  deleteIds: number[];
}
