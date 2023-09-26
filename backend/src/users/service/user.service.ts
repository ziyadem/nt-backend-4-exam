import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUserDto, LoginDto, RegisterDto, UserUpdateDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repo/user.repo';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    private UserRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async register(user: RegisterDto) {
    try {
      let resRegUser = await this.UserRepo.register(user);
      let token = await this.jwtService.sign({ id: resRegUser[0].id });
      if (resRegUser.length == 1) {
        return {
          message: 'Created user!',
          token,
        };
      }
      return new InternalServerErrorException();
    } catch (error) {
      console.log(error);
      
      if (error.detail) {
        return new ConflictException('User already exists!');
      }
    }
  }

  async login(user: LoginDto) {
    try {
      let foundedUser = await this.UserRepo.login(user);
      if (foundedUser.length == 0) {
        return new NotFoundException('User not found!');
      }
      let checkPsw = await bcrypt.compare(
        user.password,
        foundedUser[0].password,
      );
      if (!checkPsw) return new BadRequestException('Password xato!');

      let token = await this.jwtService.sign({ id: foundedUser[0].id });
      
      return {
        message: 'Logged in!',
        token,
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async update(user: CurrentUserDto, data: UserUpdateDto) {
    try {
        let updateUser = await this.UserRepo.update(user, data);
        if(updateUser.length==0){return new NotFoundException('User not found!')}
        return {
            message: 'User updated!'
        }
        
    } catch (error) {
        return new InternalServerErrorException();       
    }    
  }

  async getOne(user: CurrentUserDto) {
    try {
        let foundedUser = await this.UserRepo.getOne(user);
        if (foundedUser.length == 0) {
          return new NotFoundException('User not found!');
        }
        return foundedUser
        
    } catch (error) {
        return new InternalServerErrorException();       
    }    
  }
  async getAll(user: CurrentUserDto) {
    try {
        let foundedUser = await this.UserRepo.getAll(user);
        return foundedUser       
    } catch (error) {
        return new InternalServerErrorException();       
    }    
  }

  async delete(user: CurrentUserDto) {
    try {
        let deleteUser = await this.UserRepo.delete(user);
        if(deleteUser.length==0){return new NotFoundException('User not found!')}
        return {
            message: 'User deleted!'
        }
        
    } catch (error) {
        return new InternalServerErrorException();       
    }    
  }
}
