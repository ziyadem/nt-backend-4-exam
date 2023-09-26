import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { KarzinkaRepository } from '../repo/karzinka.repo';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class KarzinkaService {
  constructor(
    private karzinkaRepo: KarzinkaRepository
  ) {}

  async getAll(userId:CurrentUserDto) {
    try {
      return await this.karzinkaRepo.getAll(userId);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async create(carId: CurrentUserDto,userId:CurrentUserDto) {
    try {
      let getOne = await this.karzinkaRepo.getone(carId,userId);
      if (getOne.length==1) return new ConflictException('karzinka alredy exists');
      let res = await this.karzinkaRepo.create(carId,userId);
      return { message: 'karzinka created'}
    } catch (error) {  
      return new NotFoundException('car_id yoki user_id xato')     
    }
  }

  async delete(karzinka: CurrentUserDto,user:CurrentUserDto) {
    try {
      let deleteKorzinka = await this.karzinkaRepo.delete(karzinka,user);
      if (deleteKorzinka.length == 0) {
        return new NotFoundException('Korzinka not found!');
      }
      return {
        message: 'Korzinka deleted!',
      };
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }
}
