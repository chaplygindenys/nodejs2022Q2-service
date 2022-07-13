import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-update.dto';

@Injectable()
export class UserService {
  private userDB: User[] = [];

  findAll() {
    let AllUsersRespons = [];
    if (this.userDB[0] !== undefined) {
      this.userDB.forEach((user: User) => {
        const { id, login, version, createdAt, updatedAt } = user;
        const userResponse: UserResponse = {
          id,
          login,
          version,
          createdAt,
          updatedAt,
        };
        AllUsersRespons = [...AllUsersRespons, userResponse];
      });
      return AllUsersRespons;
    } else {
      return null;
    }
  }

  findOne(_id: string) {
    const user: User = this.userDB.find((user: User) =>
      user.id === _id ? user : undefined,
    );
    if (user) {
      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    } else {
      return null;
    }
  }

  addOne(createUserDto: CreateUserDto) {
    const user = {
      id: uuidV4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };
    this.userDB.push(user);
    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  upPas(id: string, updatePasswordDto: UpdatePasswordDto) {
    const index = this.userDB.findIndex((p) => p.id === id);
    if (index >= 0) {
      if (updatePasswordDto.oldPassword === this.userDB[index].password) {
        const upUserWithoutpass = {
          id,
          login: this.userDB[index].login,
          version: +this.userDB[index].version + 1,
          createdAt: this.userDB[index].createdAt,
          updatedAt: +Date.now(),
        };
        this.userDB[index] = {
          ...upUserWithoutpass,
          password: updatePasswordDto.newPassword,
        };
        return upUserWithoutpass;
      } else {
        return 403;
      }
    } else {
      return null;
    }
  }

  deleteOne(_id: string) {
    console.log(_id);
    const resalt = this.userDB.find((user: User) => {
      if (user.id === _id) {
        return true;
      }
    });
    if (resalt) {
      console.log(resalt);
      const users = this.userDB.filter((p) => p.id !== _id);
      this.userDB = users;
      return true;
    } else {
      console.log('null', resalt);
      return null;
    }
  }
}
