import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

//基础实体信息
@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    default: null,
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    default: null,
    comment: '更新时间',
  })
  updateTime: Date;
}
