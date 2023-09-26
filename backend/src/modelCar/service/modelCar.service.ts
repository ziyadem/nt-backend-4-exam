import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelCarRepository } from '../repo/modelCar.repo';
import * as bcrypt from 'bcrypt';
import { CurrentUserDto } from 'src/users/dto/user.dto';
import { ModelCreateDto, ModelUpdateDto } from '../dto/modelCar.dto';

@Injectable()
export class ModelCarService {
  constructor(
    private ModelRepo: ModelCarRepository,
    private jwtService: JwtService,
  ) {}
  async getAll() {
    try {
      let foundedUser = await this.ModelRepo.getAll();
      return foundedUser;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

    async getOne(model:CurrentUserDto) {
      try {
        let foundedModel = await this.ModelRepo.getOne(model);
        if (foundedModel.length == 0) {
          return new NotFoundException('Model not found!');
        }
        return foundedModel;
      } catch (error) {
        return new InternalServerErrorException();
      }
    }

    async create(model: ModelCreateDto) {
      try {
        let resRegUser = await this.ModelRepo.create(model);
        
          return {message: 'Created user!'};
      } catch (error) {
        if (error.detail) {
          return new ConflictException('model already exists!');
        }
        return new InternalServerErrorException()
      }
    }

    async update(model:ModelUpdateDto,modelId: CurrentUserDto) {
      try {
        let updateModel = await this.ModelRepo.update(model, modelId);
        if (updateModel.length == 0) {
          return new NotFoundException('Model not found!');
        }
        return {
          message: 'Model updated!',
        };
      } catch (error) {
        return new InternalServerErrorException();
      }
    }

    async delete(model: CurrentUserDto) {
      try {
        let deleteModel = await this.ModelRepo.delete(model);
        if (deleteModel.length == 0) {
          return new NotFoundException('Model not found!');
        }
        return {
          message: 'Model deleted!',
        };
      } catch (error) {
        console.log(error);
        
        return new InternalServerErrorException();
      }
    }
}
