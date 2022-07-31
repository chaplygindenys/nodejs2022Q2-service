import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-update.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export default class UserService {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  async findAll() {
    try {
      const allUsers: UserResponse[] = await this.prismaService.user.findMany({
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return allUsers;
    } catch (error) {
      return [];
    }
  }

  async findOne(id: string) {
    try {
      const user: UserResponse = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async addOne(createUserDto: CreateUserDto) {
    const hashPsw = await this.authService.hashData(createUserDto.password);
    const user = {
      login: createUserDto.login,
      hashPsw,
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };
    try {
      const newUser: UserResponse = await this.prismaService.user.create({
        data: user,
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return newUser;
    } catch (error) {
      return null;
    }
  }

  async upPas(id: string, updatePasswordDto: UpdatePasswordDto) {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (existingUser) {
      if (updatePasswordDto.oldPassword === existingUser.password) {
        const user = {
          id,
          login: existingUser.login,
          password: updatePasswordDto.newPassword,
          version: existingUser.version + 1,
          createdAt: +existingUser.createdAt,
          updatedAt: +Date.now(),
        };
        const upUser: UserResponse = await this.prismaService.user.update({
          where: { id },
          data: { ...user },
          select: {
            id: true,
            login: true,
            version: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        return upUser;
      } else {
        return 403;
      }
    } else {
      return null;
    }
  }

  async deleteOne(id: string) {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (existingUser) {
      await this.prismaService.user.delete({
        where: { id },
      });
      return true;
    } else {
      return null;
    }
  }
}
