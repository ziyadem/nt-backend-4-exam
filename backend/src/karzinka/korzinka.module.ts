import { Module } from '@nestjs/common';
import { KarzinkaController } from './controller/karzinka.controller';
import { KarzinkaService } from './service/karzinka.service';
import { KarzinkaRepository } from './repo/karzinka.repo';
import { KnexConfigModule } from 'src/knex-config/KnexConfig.module';

@Module({
  imports: [ KnexConfigModule],
  controllers: [KarzinkaController],
  providers: [KarzinkaService, KarzinkaRepository],
})
export class KarzinkaModule {}
