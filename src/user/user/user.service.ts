import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UserService {
  private userDB: User[] = [];

  findAll() {
    let AllUsersRespons = [];
    if (this.userDB[0] === undefined) {
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

  deleteOne(_id: string) {
    const resalt = this.userDB.filter((p) => p.id !== _id);
    if (resalt) {
      this.userDB = resalt;
      return true;
    } else {
      return null;
    }
  }

  addOne(createUserDto: CreateUserDto) {
    if (
      typeof createUserDto.login === 'string' &&
      typeof createUserDto.password === 'string'
    ) {
      console.log(createUserDto);
      const user = {
        id: uuidV4(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: 1,
      };
      // console.log(user);
      this.userDB.push(user);
      return user;
    } else {
      return null;
    }
  }

  upPas(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (
      typeof updatePasswordDto.newPassword === 'string' &&
      typeof updatePasswordDto.oldPassowrd === 'string'
    ) {
      // console.log(updatePasswordDto);
      const index = this.userDB.findIndex((p) => p.id === id);
      // console.log(index);
      if (index >= 0) {
        // console.log(updatePasswordDto);
        // console.log(this.userDB[index]);
        if (updatePasswordDto.oldPassowrd === this.userDB[index].password) {
          const upUserWithoutpass = {
            id,
            login: this.userDB[index].login,
            version: +this.userDB[index].version + 1,
            createdAt: this.userDB[index].createdAt,
            updatedAt: 1 + +Date.now(),
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
    } else {
      return 400;
    }
  }
}
