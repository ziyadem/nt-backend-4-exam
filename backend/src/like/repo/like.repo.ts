import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class LikeRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

    getAll(user: CurrentUserDto) {
      const { id } = user;
      const knex = this.knexConfig.instance;
      return knex
        .select(
          'model.marka',
          'cars.title',
          'cars.narx',
          'cars.img_model',
          'likes.id as likes_id',
        )
        .from('likes')
        .where('likes.user_id', id)
        .join('cars', 'cars.id', '=', 'likes.car_id')
        .join('model', 'model.id', '=', 'cars.model');
    }

    getAllCars(cars: CurrentUserDto) {
      const { id } = cars;
      
      const knex = this.knexConfig.instance;
      return knex
        .select(
          'model.marka',
          'cars.title',
          'users.firstname',
          'likes.id as likes_id',
        )
        .from('likes')
        .where('likes.car_id', id)
        .join('cars', 'cars.id', '=', 'likes.car_id')
        .join('model', 'model.id', '=', 'cars.model')
        .join('users', 'users.id', '=', 'likes.user_id')
    }

    async create(carId: CurrentUserDto, userId: CurrentUserDto) {
      const knex = this.knexConfig.instance;
      return knex('likes')
        .returning('*')
        .insert({
          car_id: carId.id,
          user_id: userId.id,
          car_user: carId.id + userId.id,
        });
    }

    async getone(carId: CurrentUserDto, userId: CurrentUserDto) {
      const knex = this.knexConfig.instance;
      return knex
        .select('*')
        .from('likes')
        .where({ car_id: carId.id, user_id: userId.id });
    }

    async delete(karzinka: CurrentUserDto, user: CurrentUserDto) {
      const knex = this.knexConfig.instance;
      return knex('likes')
        .returning('*')
        .where({ id: karzinka.id, user_id: user.id })
        .del();
    }
}
