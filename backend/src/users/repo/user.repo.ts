import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { CurrentUserDto, LoginDto, RegisterDto, UserUpdateDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  async register(user: RegisterDto) {
    const { firstname, lastname, password: psw, email, img } = user;
    const knex = this.knexConfig.instance;
    let password = await bcrypt.hash(psw, 12);
    return knex('users').returning('*').insert({
      firstname,
      lastname,
      email,
      password,
      img,
    });
  }

  login(user: LoginDto) {
    const { email, password } = user;
    const knex = this.knexConfig.instance;
    return knex('users').select('*').where('email', email);
  }

  async update(user: CurrentUserDto, data: UserUpdateDto) {
    const knex = this.knexConfig.instance;
    let password = await bcrypt.hash(data.password, 12);
    data.password = password;
    return knex('users').returning('*').where({ id: user.id }).update(data);
  }

  async delete(user: CurrentUserDto) {
    let id = user.id;
    const knex = this.knexConfig.instance;
    await knex('karzinka')
      .returning('*')
      .where({user_id:id})
      .del();
    await knex('likes')
      .returning('*')
      .where({user_id:id})
      .del();
    return knex('users')
      .returning('*')
      .where({id:id})
      .del();
    }
    
  getOne(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const getUser = knex.select('*').from('users').where({ id });
    return getUser;
  }

  getAll(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const getUser = knex.select('*').from('users');
    return getUser;
  }
}
