import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repo';
import { KnexConfigModule } from 'src/knex-config/KnexConfig.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [KnexConfigModule  ,JwtModule.register({
      global: true,
      secret: 'secret_key',
      signOptions: { expiresIn: '1d' },
    }),],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
