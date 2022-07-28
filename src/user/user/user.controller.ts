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
import UserService from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param() params: FindOneIdParams) {
    const user = await this.userService.findOne(params.id);
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user: UserResponse | null = await this.userService.addOne(
      createUserDto,
    );
    return user;
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param() params: FindOneIdParams,
  ) {
    const user = await this.userService.upPas(params.id, updatePasswordDto);
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
  async remove(@Param() params: FindOneIdParams) {
    const user = await this.userService.deleteOne(params.id);
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
