import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LikeRepository } from '../repo/like.repo';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class LikeService {
  constructor(private likeRepo: LikeRepository) {}

  async getAll(user: CurrentUserDto) {
    try {
      return await this.likeRepo.getAll(user);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
  async getAllCars(cars: CurrentUserDto) {
    try {
      return await this.likeRepo.getAllCars(cars);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async create(carId:CurrentUserDto,userId:CurrentUserDto) {
    try {
      let getOne = await this.likeRepo.getone(carId, userId);
      if (getOne.length == 1) return { message: 'like alredy exists' };
      let res = await this.likeRepo.create(carId,userId);
      return { message: 'like created' };
    } catch (error) {
      return new NotFoundException('car_id yoki user_id xato');
    }
  }

  async delete(karzinka: CurrentUserDto, user: CurrentUserDto) {
    try {
      let deleteLikes = await this.likeRepo.delete(karzinka, user);
      if (deleteLikes.length == 0) {
        return new NotFoundException('Likes not found!');
      }
      return {
        message: 'Likes deleted!',
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
