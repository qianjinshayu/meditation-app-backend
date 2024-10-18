import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column({
    length: 50,
    comment: '名称',
  })
  name: string;

  @Column({
    length: 2083,
    comment: '封面图',
  })
  cover: string;

  @Column({
    length: 50,
    comment: '简要描述',
  })
  describe: string;

  @Column({
    comment: '水平等级: 1-零基础 2-入门 3-进阶 4-大师',
    default: 1,
  })
  level: number;

  @Column({
    comment: '观看人数',
    default: 0,
  })
  viewCount: number;

  @Column({
    type: 'text',
    comment: '详情介绍',
  })
  detailContent: string;

  @Column({
    length: 2083,
    comment: '音频资源url',
  })
  audioUrl: string;

  @Column({
    comment: '音频时长(秒)',
    default: 0,
  })
  duration: number;

  @Column({
    type: 'tinyint',
    comment: '是否为精选',
    default: 0,
  })
  isChoice: number;

  @Column({
    type: 'tinyint',
    comment: '是否为推荐',
    default: 0,
  })
  isRecommend: number;
}
