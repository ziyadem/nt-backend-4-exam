import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class KarzinkaRepository {
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
        'karzinka.id as korzinka_id',
      )
      .from('karzinka')
      .where('karzinka.user_id', id)
      .join('cars', 'cars.id', '=', 'karzinka.car_id')
      .join('model', 'model.id', '=', 'cars.model');
  }

  async create(carId: CurrentUserDto, userId: CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex('karzinka')
      .returning('*')
      .insert({
        user_id: userId.id,
        car_id: carId.id,
        car_user: userId.id + carId.id,
      });
  }
  async getone(carId: CurrentUserDto, userId: CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex
      .select('*')
      .from('karzinka')
      .where({ user_id: userId.id, car_id: carId.id });
  }
  async delete(karzinkaId: CurrentUserDto, user: CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex('karzinka')
      .returning('*')
      .where({ id: karzinkaId.id, user_id: user.id })
      .del();
  }
}
