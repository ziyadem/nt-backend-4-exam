import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {AuthorizationGuard} from '../../users/groud/user.groud';
import { CurrentUser } from 'src/users/getUserDecorator';
import { CurrentUserDto } from '../../users/dto/user.dto';
import { KarzinkaService } from '../service/karzinka.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Karzinka')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('karzinka')
export class KarzinkaController {
  constructor(private karzinkaService: KarzinkaService) {}

  @Get('user')
  async getAll(@CurrentUser() userId: CurrentUserDto) {
    return await this.karzinkaService.getAll(userId);
  }

    @UseGuards(AuthorizationGuard)
    @Post(':id')
    async create(@Param() carId: CurrentUserDto,@CurrentUser() userId:CurrentUserDto) {
      return await this.karzinkaService.create(carId,userId);
    }

    @UseGuards(AuthorizationGuard)
    @Delete('/:id')
    async delete(@Param() karzinkaId: CurrentUserDto,@CurrentUser()userId:CurrentUserDto) {
      return await this.karzinkaService.delete(karzinkaId, userId);
    }
}
