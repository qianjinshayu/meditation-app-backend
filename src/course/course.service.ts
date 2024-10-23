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

  /**
   * 初始化一些冥想课程数据
   */
  initData() {
    const detailContent = `
      <strong>练习介绍</strong><br>
      <p>对于冥想，或许你是第一次听说，或许你曾经听说过但是不怎么了解，本练习会帮助你轻松入门冥想，知道冥想是什么，以及如何开始自己的第一次冥想。</p>
      <p>身体扫描是正念冥想中最基础和最经典的练习方式之一。平时我们大部分的时间都在不停的思考，而忽视了我们的身体感受。通过身体扫描训练，我们可以在当下的时刻与身体建立一种好奇、亲密而且友好的联结，而和大脑中所有的思想、观点、信念、判断和愿望暂时割裂，让思维松弛下来。</p><br>
      <strong>练习类型</strong><br>
      <p>基础</p><br>
      <strong>事宜人群</strong><br>
      <p>之前从来没有练习过冥想的人;</p><br>
      <p>对冥想感兴趣想要学习冥想的人。</p>
    `;
    const cover =
      'https://course-service-oss.oss-cn-shanghai.aliyuncs.com/avatar/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20221116172645.jpg';
    const audioUrl =
      'https://course-service-oss.oss-cn-shanghai.aliyuncs.com/audio/We%20Are%20The%20Night%20-%20%ED%8B%B0%EB%9D%BC%EB%AF%B8%EC%88%98%20%EC%BC%80%EC%9D%B5.mp3';

    const course1 = new Course();
    course1.name = '冥想初体验';
    course1.cover = cover;
    course1.describe = '适合冥想小白的第一次练习';
    course1.level = 1;
    course1.viewCount = 652282;
    course1.duration = 186;
    course1.isRecommend = 1;
    course1.detailContent = detailContent;
    course1.audioUrl = audioUrl;

    const course2 = new Course();
    course2.name = '睡前放松(轻度)';
    course2.cover = cover;
    course2.describe = '缓解身心紧张，更好入眠';
    course2.level = 2;
    course2.viewCount = 22182;
    course2.duration = 123;
    course2.isRecommend = 1;
    course2.detailContent = detailContent;
    course2.audioUrl = audioUrl;

    const course3 = new Course();
    course3.name = '身体扫描(入门)';
    course3.cover = cover;
    course3.describe = '与身体联结';
    course3.level = 2;
    course3.viewCount = 522182;
    course3.duration = 1360;
    course3.isRecommend = 1;
    course3.detailContent = detailContent;
    course3.audioUrl = audioUrl;

    const course4 = new Course();
    course4.name = '自然入眠';
    course4.cover = cover;
    course4.describe = '自然进入梦乡';
    course4.level = 2;
    course4.viewCount = 22182;
    course4.duration = 1360;
    course4.isChoice = 1;
    course4.detailContent = detailContent;
    course4.audioUrl = audioUrl;

    const course5 = new Course();
    course5.name = '睡前感恩';
    course5.cover = cover;
    course5.describe = '带着爱与平静入梦';
    course5.level = 2;
    course5.viewCount = 92182;
    course5.duration = 1860;
    course5.isChoice = 1;
    course5.detailContent = detailContent;
    course5.audioUrl = audioUrl;

    const course6 = new Course();
    course6.name = '晨间充电';
    course6.cover = cover;
    course6.describe = '激活身心，重启思维';
    course6.level = 2;
    course6.viewCount = 92182;
    course6.duration = 1160;
    course6.isChoice = 1;
    course6.detailContent = detailContent;
    course6.audioUrl = audioUrl;

    const course7 = new Course();
    course7.name = '开启美好一天';
    course7.cover = cover;
    course7.describe = '美好的一天，从冥想开始';
    course7.level = 3;
    course7.viewCount = 12182;
    course7.duration = 1160;
    course7.isChoice = 1;
    course7.detailContent = detailContent;
    course7.audioUrl = audioUrl;

    const course8 = new Course();
    course8.name = '提升冥想';
    course8.cover = cover;
    course8.describe = '清醒一下';
    course8.level = 4;
    course8.viewCount = 62182;
    course8.duration = 1160;
    course8.isChoice = 1;
    course8.detailContent = detailContent;
    course8.audioUrl = audioUrl;

    return this.courseRepository.save([
      course1,
      course2,
      course3,
      course4,
      course5,
      course6,
      course7,
      course8,
    ]);
  }
}
