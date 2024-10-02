import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: randomUUID(),
      username: 'user',
      password: 'password',
    },
    {
      userId: randomUUID(),
      username: 'friendlyUser',
      password: 'password',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
