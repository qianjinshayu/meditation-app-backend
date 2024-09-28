import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class ListUserDto extends PaginationQueryDto {
  @IsOptional()
  name: string;
}
