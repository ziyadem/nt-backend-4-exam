import { Module } from '@nestjs/common';
import { CarController } from './controller/cars.controller';
import { CarService } from './service/cars.service';
import { CarRepository } from './repo/cars.repo';
import { JwtModule } from '@nestjs/jwt';
import { KnexConfigModule } from 'src/knex-config/KnexConfig.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
