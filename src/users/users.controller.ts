import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  findAll(): object {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<object> {
    return await this.usersService.create(user);
  }
}
