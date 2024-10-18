import { IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';

/** 创建冥想课程 Dto */
export class CreateCourseDto {
  @IsNotEmpty({
    message: '名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '封面图不能为空',
  })
  cover: string;

  @IsOptional()
  describe: string;

  @IsInt()
  @Min(0)
  @Max(10)
  level: number;

  @IsNotEmpty({
    message: '练习简介不能为空',
  })
  detailContent: string;

  @IsNotEmpty({
    message: '音频不能为空',
  })
  audioUrl: string;
}
