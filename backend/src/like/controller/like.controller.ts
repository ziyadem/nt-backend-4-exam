import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from '../../users/groud/user.groud';
import { CurrentUser } from 'src/users/getUserDecorator';
import { CurrentUserDto } from '../../users/dto/user.dto';
import { LikeService } from '../service/like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get('user')
  async getAll(@CurrentUser() user: CurrentUserDto) {
    return await this.likeService.getAll(user);
  }

  @Get('cars/:id')
  async getAllCars(@Param() cars: CurrentUserDto) {
    return await this.likeService.getAllCars(cars);
  }

  @Post('/:id')
  async create(@Param() carId:CurrentUserDto,@CurrentUser() userId: CurrentUserDto) {
    return await this.likeService.create(carId, userId);
  }

  @Delete('/:id')
  async delete(
    @Param() likeId: CurrentUserDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.likeService.delete(likeId, user);
  }
}
