import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { ModelCreateDto, ModelUpdateDto } from '../dto/modelCar.dto';
import { CurrentUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class ModelCarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getAll() {
    const knex = this.knexConfig.instance;
    const getModel = knex.select('*').from('model');
    return getModel;
  }

    getOne(model) {
      const { id } = model;
      const knex = this.knexConfig.instance;
      const getModel = knex.select('*').from('model').where({ id });
      return getModel;
    }

  async create(model: ModelCreateDto) {
    const knex = this.knexConfig.instance;
    return knex('model').returning('*').insert(model);
  }

    async update(model: ModelUpdateDto,modelId:CurrentUserDto) {
      const knex = this.knexConfig.instance;
      return knex('model')
        .returning('*')
        .where({ id: modelId.id })
        .update(model);
    }

    async delete(model: CurrentUserDto) {
      let id = model.id;
      const knex = this.knexConfig.instance;
       await knex('cars')
            .returning('*')
            .where({model: model.id})
            .del();
       return knex('model')
            .returning('*')
            .where({id: model.id})
            .del();
      }
    
}
