import {
  IsInt,
  IsOptional,
  Min,
  IsString,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number) // 转换字符串为数字
  @IsInt()
  @Min(1)
  pageNum?: number = 1; // 默认页码为 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10; // 默认每页 10 条数据

  /**
   * 开始时间
   */
  @IsOptional()
  @IsDateString()
  beginTime?: string;

  /**
   * 结束时间
   */
  @IsOptional()
  @IsDateString()
  endTime?: string;

  /**
   * 排序字段
   */
  @IsOptional()
  @IsString()
  orderByColumn?: string;

  /**
   * 排序规则
   */
  @IsOptional()
  @IsString()
  isAsc?: 'ascending' | 'descending';
}
