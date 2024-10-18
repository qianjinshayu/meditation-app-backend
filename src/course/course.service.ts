import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationCourseDto } from './dto/pagination-course.dto';

@Injectable()
export class CourseService {
  @InjectRepository(Course)
  private courseRepository: Repository<Course>;

  create(createCourseDto: CreateCourseDto) {
    this.courseRepository.save(createCourseDto);
    return '创建冥想课程成功';
  }

  async findAndCount(paginationCourseDto: PaginationCourseDto) {
    const {
      pageNum = 1,
      pageSize = 10,
      isChoice,
      isRecommend,
    } = paginationCourseDto;

    const where: any = {};

    // 过滤精选
    if (isChoice) {
      where.isChoice = isChoice;
    }

    // 过滤推荐
    if (isRecommend) {
      where.isRecommend = isRecommend;
    }

    const skip = (pageNum - 1) * pageSize;
    const [result, total] = await this.courseRepository.findAndCount({
      where,
      skip,
      take: pageSize,
    });

    // 返回分页数据
    return {
      data: result,
      pageNum,
      pageSize,
      total,
    };
  }

  findOne(id: number) {
    if (typeof id !== 'number') {
      throw new HttpException('课程id不能为空', HttpStatus.BAD_REQUEST);
    }
    return this.courseRepository.findOne({ where: { id } });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    console.log(updateCourseDto);
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
