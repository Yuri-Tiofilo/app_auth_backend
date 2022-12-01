import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { USER_REPOSITORY } from './users.providers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private photoRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.photoRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.photoRepository.create(user);
  }
}
