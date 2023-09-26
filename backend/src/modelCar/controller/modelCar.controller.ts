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
import { ModelCarService } from '../service/modelCar.service';
import {CurrentUserDto} from '../../users/dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {AdminAuthorizationGuard, AuthorizationGuard} from '../../users/groud/user.groud';
import { ModelCreateDto, ModelUpdateDto } from '../dto/modelCar.dto';

@ApiTags('Models')
@ApiBearerAuth()
@Controller('models')
export class ModelController {
  constructor(private modelService: ModelCarService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  async getAll() {
    return await this.modelService.getAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get('/:id')
  async getOne(@Param() model: CurrentUserDto) {
    return await this.modelService.getOne(model);
  }

  @UseGuards(AdminAuthorizationGuard)
  @Post('/create')
  async create(@Body() model: ModelCreateDto) {
    return await this.modelService.create(model);
  }

  @UseGuards(AdminAuthorizationGuard)
  @Put('/:id')
  async update(
    @Body() model: ModelUpdateDto,
    @Param() modelId: CurrentUserDto,
  ) {
    return await this.modelService.update(model, modelId);
  }

  @UseGuards(AdminAuthorizationGuard)
  @Delete('/:id')
  async delete(@Param() modelId: CurrentUserDto) {
    return await this.modelService.delete(modelId);
  }
}
