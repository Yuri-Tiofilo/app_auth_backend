import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IHashProvider } from './HashProvider/hashprovider.types';
import { User } from './users.entity';
import { USER_REPOSITORY } from './users.providers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,

    @Inject('HASH_PROVIDER')
    private hashProvider: IHashProvider,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User | Error> {
    const userExist = await this.userRepository.findBy({
      email: user.email,
    });

    if (userExist) {
      throw new Error(`User exist with email ${user.email}`);
    }

    const hashedPassword = await this.hashProvider.generateHash(user.password);
    const userCreated = await this.userRepository.save(
      this.userRepository.create({
        ...user,
        password: hashedPassword,
      }),
    );

    const userFormatted = userCreated;
    delete userFormatted.password;
    return userFormatted;
  }
}
