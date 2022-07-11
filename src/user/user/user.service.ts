import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private userDB: User[]) {}

  async findOne(_id: string) {
    const user: User = await this.userDB.find((user: User) =>
      user.id === _id ? user : null,
    );
    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  async deleteOne(_id: string) {
    const resalt = await this.userDB.filter((p) => p.id !== _id);
    this.userDB = resalt;
    return null;
  }

  async addOne({ login, password }: User) {
    const user = {
      id: uuidV4(),
      login,
      password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: 0,
    };
    this.userDB.push(user);
    return user;
  }
  async upPas({ id, password }: User) {
    const index = await this.userDB.findIndex((p) => p.id === id);

    const upUserWithoutpass = {
      id,
      login: this.userDB[index].login,
      version: +this.userDB[index].version + 1,
      createdAt: this.userDB[index].createdAt,
      updatedAt: Date.now(),
    };
    this.userDB[index] = { ...upUserWithoutpass, password };
    return upUserWithoutpass;
  }
}
