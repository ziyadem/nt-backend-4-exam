import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { CarsCreateDto,CarsUpdateDto } from '../dto/cars.dto';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getAll() {
    const knex = this.knexConfig.instance;
     return knex('cars')
       .join('model', 'model.id', '=', 'cars.model')
       .select(
         'cars.id',
         'cars.tanirovka',
         'cars.title',
         'cars.motor',
         'cars.year',
         'cars.color',
         'cars.distance',
         'cars.gearbook',
         'cars.description',
         'cars.narx',
         'cars.img_model',
         'cars.img_tashqi',
         'cars.img_ichki',
         'model.marka',
       );

  }

  carsModel(model:CurrentUserDto) {
    const knex = this.knexConfig.instance;
     return knex('cars')
       .where('cars.model', model.id)
       .join('model', 'model.id', '=', 'cars.model')
       .select(
         'cars.id',
         'cars.tanirovka',
         'cars.title',
         'cars.motor',
         'cars.year',
         'cars.color',
         'cars.distance',
         'cars.gearbook',
         'cars.description',
         'cars.narx',
         'cars.img_model',
         'cars.img_tashqi',
         'cars.img_ichki',
         'model.marka',
       );

  }

  getOne(cars){
    const knex = this.knexConfig.instance;
    return knex('cars')
      .where('cars.id', cars.id)
      .join('model', 'model.id', '=', 'cars.model')
      .select(
        'cars.id',
        'cars.title',
        'cars.tanirovka',
        'cars.motor',
        'cars.year',
        'cars.color',
        'cars.distance',
        'cars.gearbook',
        'cars.description',
        'cars.narx',
        'cars.img_model',
        'cars.img_tashqi',
        'cars.img_ichki',
        'model.marka',
      );
  }

  async create(car: CarsCreateDto) {
    const knex = this.knexConfig.instance;
    return knex('cars').returning('*').insert(car);
  }

  async update(car: CarsUpdateDto, carId: CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex('cars').returning('*').where({ id: carId.id }).update(car);
  }

  async delete(model: CurrentUserDto) {
    let id = model.id;
    const knex = this.knexConfig.instance;
    await knex('likes').returning('*').where({ car_id: model.id }).del();
    await knex('karzinka').returning('*').where({ car_id: model.id }).del();
    return knex('cars')
      .returning('*')
      .where({ id: model.id })
      .del();
  }
}
