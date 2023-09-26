import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CarRepository } from '../repo/cars.repo';
import { CurrentUserDto } from 'src/users/dto/user.dto';
import { CarsCreateDto, CarsUpdateDto } from '../dto/cars.dto';

@Injectable()
export class CarService {
  constructor(
    private CarRepo: CarRepository
  ) {}

  async getAll() {
    try {
      let foundedCars = await this.CarRepo.getAll();
      return foundedCars;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async carsModel(model:CurrentUserDto) {
    try {
      let foundedCars = await this.CarRepo.carsModel(model);
      return foundedCars;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getOne(car: CurrentUserDto) {
    try {
      let foundedCar = await this.CarRepo.getOne(car);
      if (foundedCar.length == 0) {
        return new NotFoundException('car not found!');
      }
      return foundedCar;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async create(car: CarsCreateDto) {
    try {
      let cars = await this.CarRepo.create(car);
      return { message: 'Created car!' };
    } catch (error) {
      if (error.detail) {
        return new ConflictException('car already exists!');
      }
      return new InternalServerErrorException();
    }
  }

  async update(car: CarsUpdateDto, carId: CurrentUserDto) {
    try {
      let updateCar= await this.CarRepo.update(car, carId);
      if (updateCar.length == 0) {
        return new NotFoundException('car not found!');
      }
      return {
        message: 'car updated!',
      };
    } catch (error) {       
      return new InternalServerErrorException(error.detail);
    }
  }

  async delete(model: CurrentUserDto) {
    try {
      let deleteModel = await this.CarRepo.delete(model);
      if (deleteModel.length == 0) {
        return new NotFoundException('car not found!');
      }
      return {
        message: 'car deleted!',
      };
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }
}
