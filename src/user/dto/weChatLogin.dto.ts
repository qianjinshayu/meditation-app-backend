import { IsNotEmpty, IsString } from 'class-validator';

/** 微信小程序登录 Dto */
export class WeChatLoginDto {
  @IsString({ message: '不是有效的code' })
  @IsNotEmpty({ message: 'code不能为Empty' })
  code: string;
}
