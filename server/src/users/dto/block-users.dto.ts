import { IsInt, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class BlockUsersDto {
  @IsNotEmpty()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  blockIds: number[];
}
