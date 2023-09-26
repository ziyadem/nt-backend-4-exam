import { Module } from '@nestjs/common';
import { LikeController } from './controller/like.controller';
import { LikeService } from './service/like.service';
import { LikeRepository } from './repo/like.repo';
import { KnexConfigModule } from 'src/knex-config/KnexConfig.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
