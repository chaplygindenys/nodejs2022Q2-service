import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  Header,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Res({ passthrough: true }) res: Response, @Param('id') id: string) {
    try {
      if (uuidValidate(id)) {
        console.log(id);
        const user = this.userService.findOne(id);
        if (user === null) {
          throw '404';
        }
        return JSON.stringify(user);
      } else {
        throw '400';
      }
      throw '404';
    } catch (err) {
      if (err === '404') {
        res.status(HttpStatus.NOT_FOUND).send();
        res.end();
      } else if (err === '400') {
        res.status(HttpStatus.BAD_REQUEST).send();
        res.end();
      } else {
        console.log(err);
      }
    }
  }

  @Post()
  @HttpCode(201)
  create(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user: UserResponse | number | null =
        this.userService.addOne(createUserDto);
      if (+user === 403) {
        throw '403';
      }
      if (user === null || +user === 400) {
        throw '400';
      }
      return JSON.stringify(user);
    } catch (err) {
      if (err === '403') {
        res.status(HttpStatus.FORBIDDEN).send();
        res.end();
      } else if (err === '400') {
        res.status(HttpStatus.BAD_REQUEST).send();
        res.end();
      } else {
        console.log(err);
      }
    }
    return this.userService.addOne(createUserDto);
  }

  @Put(':id')
  update(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      if (uuidValidate(id)) {
        console.log(id);
        const user = this.userService.upPas(id, updatePasswordDto);
        if (+user === 400) {
          throw '400';
        }
        if (user === null) {
          throw '404';
        }
        return JSON.stringify(user);
      }
      if (!uuidValidate(id)) throw '400';
    } catch (err) {
      if (err === '404') {
        res.status(HttpStatus.NOT_FOUND).send();
        res.end();
      } else if (err === '400') {
        res.status(HttpStatus.BAD_REQUEST).send();
        res.end();
      } else {
        console.log(err);
      }
    }
  }

  @Delete(':id')
  remove(@Res({ passthrough: true }) res: Response, @Param('id') id: string) {
    try {
      if (uuidValidate(id)) {
        const user = this.userService.deleteOne(id);
        if (user === null) {
          throw '404';
        }
        res.status(HttpStatus.NO_CONTENT).send();
        res.end();
      }
      if (!uuidValidate(id)) throw '400';
    } catch (err) {
      if (err === '404') {
        res.status(HttpStatus.NOT_FOUND).send();
        res.end();
      } else if (err === '400') {
        res.status(HttpStatus.BAD_REQUEST).send();
        res.end();
      } else {
        console.log(err);
      }
    }
  }
}
