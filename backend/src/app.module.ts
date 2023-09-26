import { Module } from '@nestjs/common';
import { KnexConfigModule } from './knex-config/KnexConfig.module';
import { UserModule } from './users/user.module';
import { ModelCarModule } from './modelCar/modelCar.module';
import { CarModule } from './cars/cars.module';
import { KarzinkaModule } from './karzinka/korzinka.module';
import { LikeModule } from './like/like.module';


@Module({
  imports: [
    KnexConfigModule,
    UserModule,
    ModelCarModule,
    CarModule,
    KarzinkaModule,
    LikeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
