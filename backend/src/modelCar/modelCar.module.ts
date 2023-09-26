import { Module } from '@nestjs/common';
import { ModelController } from './controller/modelCar.controller';
import { ModelCarService } from './service/modelCar.service';
import { ModelCarRepository } from './repo/modelCar.repo';
import { JwtModule } from '@nestjs/jwt';
import { KnexConfigModule } from 'src/knex-config/KnexConfig.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [ModelController],
  providers: [ModelCarService, ModelCarRepository],
})
export class ModelCarModule {}
