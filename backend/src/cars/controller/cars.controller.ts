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
import { CarService } from '../service/cars.service';
import { CurrentUserDto } from '../../users/dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthorizationGuard ,AuthorizationGuard} from '../../users/groud/user.groud';
import { CarsCreateDto, CarsUpdateDto } from '../dto/cars.dto';

@ApiTags('Cars')
@ApiBearerAuth()
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}
  @UseGuards(AdminAuthorizationGuard)
  @Get('/all_cars')
  async getAll() {
    return await this.carService.getAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get('all_cars/:id')
  async carsModel(@Param() model_id:CurrentUserDto) {
    return await this.carService.carsModel(model_id);
  }

  @UseGuards(AuthorizationGuard)
  @Get('/:id')
  async getOne(@Param() id: CurrentUserDto) {
    return await this.carService.getOne(id);
  }

  @UseGuards(AdminAuthorizationGuard)
  @Post('/create')
  async create(@Body() car: CarsCreateDto) {
    return await this.carService.create(car);
  }

  @UseGuards(AdminAuthorizationGuard)
  @Put('/:id')
  async update(@Body() car: CarsUpdateDto, @Param() carId: CurrentUserDto) {
    return await this.carService.update(car, carId);
  }

  @UseGuards(AdminAuthorizationGuard)
    @Delete('/:id')
    async delete(@Param() carId: CurrentUserDto) {
      return await this.carService.delete(carId);
    }
}
