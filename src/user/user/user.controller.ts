import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { FindOneIdParams } from 'src/dto/id-param.dto';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    const users = this.userService.findAll();
    if (users === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Get(':id')
  findOne(@Param() params: FindOneIdParams) {
    const user = this.userService.findOne(params.id);
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    const user: UserResponse | null = this.userService.addOne(createUserDto);
    return user;
  }

  @Put(':id')
  update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param() params: FindOneIdParams,
  ) {
    const user = this.userService.upPas(params.id, updatePasswordDto);
    if (user === 403) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneIdParams) {
    console.log(params.id);
    console.log(typeof params.id);
    const user = this.userService.deleteOne(params.id);
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
