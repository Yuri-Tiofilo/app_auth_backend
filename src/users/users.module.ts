import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { HashProvider } from './HashProvider';

@Module({
  imports: [DatabaseModule, HashProvider],
  controllers: [UsersController],
  providers: [...userProviders, UsersService, HashProvider],
  exports: [...userProviders, HashProvider],
})
export class UsersModule {}
