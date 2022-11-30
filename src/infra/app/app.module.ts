import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../../database/database.module';
import { InfraModule } from '../../infra/infra.module';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [DatabaseModule, InfraModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
