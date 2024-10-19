import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 50,
    comment: '用户昵称',
    default: '',
  })
  nickName?: string;

  @Column({
    length: 2083,
    comment: '用户头像',
    default: '',
  })
  cover?: string;

  @Column({
    default: 0,
    comment: '性别 0 未知 1-男 2-女',
  })
  gender: number;

  @Column({
    length: 100,
    default: '',
    comment: 'openid',
  })
  openid: string;

  @Column({
    select: false, // 在查询时不会默认返回
    length: 100,
    default: '',
    comment: 'session_key',
  })
  session_key: string;
}
