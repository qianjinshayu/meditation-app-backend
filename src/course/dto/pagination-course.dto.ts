import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

/** 冥想课程分页请求参数 */
export class PaginationCourseDto extends PaginationQueryDto {
  @IsOptional()
  isChoice?: number;

  @IsOptional()
  isRecommend?: number;
}
