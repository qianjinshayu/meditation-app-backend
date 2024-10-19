import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  appid: string;
  secret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.appid = configService.get('wechat_appid');
    this.secret = configService.get('wechat_secret');
  }

  @InjectRepository(User)
  private userRepository: Repository<User>;

  /** 校验用户信息 */
  async validateUser(openid: string, session_key: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { openid },
    });
    // 如果已存在拥有此openid的用户，重新生成token即可
    if (user) {
      return this.certificate(user);
    }
    // 否则进行注册后再返回token
    const newUser = new User();
    newUser.openid = openid;
    newUser.session_key = session_key;

    try {
      const data = await this.userRepository.save(newUser);
      console.log('newUser', data);
      return this.certificate(data);
    } catch (err) {
      console.log(err);
      throw new HttpException('用户创建失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 颁发token */
  certificate(user: User) {
    // token的payload
    const payload = { id: user.id };
    try {
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('签证失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async weChatLogin(code: string) {
    const params = {
      appId: this.appid,
      secret: this.secret,
      js_code: code,
      grant_type: 'authorization_code',
    };

    try {
      // 微信接口 code2Session
      const res = await axios.get(
        'https://api.weixin.qq.com/sns/jscode2session',
        { params },
      );
      const { openid, session_key } = res.data;

      // 验证openid
      const authResult = await this.validateUser(openid, session_key);
      return authResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        '微信服务器请求失败:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(createUserDto: CreateUserDto) {
    // throw new HttpException('异常信息', HttpStatus.BAD_REQUEST);
    this.userRepository.save(createUserDto);
    return '添加成功';
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
