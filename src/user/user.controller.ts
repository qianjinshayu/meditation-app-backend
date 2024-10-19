import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WeChatLoginDto } from './dto/weChatLogin.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 微信小程序登录 */
  @Post('weChatLogin')
  weChatLogin(@Body() weChatLoginDto: WeChatLoginDto) {
    return this.userService.weChatLogin(weChatLoginDto.code);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationUserDto: PaginationUserDto) {
    console.log('paginationUserDto', paginationUserDto);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
