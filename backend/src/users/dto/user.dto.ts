import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, MinLength } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IUser, IUserUpdate } from '../interface/users.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsUUID()
  id: string;
}

export class UserDto implements IUser {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter your fistname',
    default: 'ziyoda',
  })
  @IsString()
  @MinLength(3)
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'Enter your lastname',
    default: 'Maxkamova',
  })
  @IsString()
  @MinLength(3)
  lastname: string;

  @ApiProperty({
    type: String,
    description: 'Enter your email',
    default: 'ziyadem@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Enter your password',
    default: 'ziyadem17',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    description: 'Enter your img url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  img: string;

  @ApiProperty({
    type: String,
    description: 'Enter your password',
    default: 'user',
  })
  @IsString()
  @MinLength(4)
  role: string;
}

export class UserUpdateDto implements IUserUpdate {
  @ApiProperty({
    type: String,
    description: 'Enter your fistname',
    default: 'ziyoda',
  })
  @IsOptional()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'Enter your lastname',
    default: 'Maxkamova',
  })
  @MinLength(3)
  @IsOptional()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    type: String,
    description: 'Enter your password',
    default: 'ziyoda17',
  })
  @MinLength(6)
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Enter your img url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  img: string;
}

export class RegisterDto extends OmitType(UserDto, ['id', 'role']) {}

export class LoginDto extends PickType(UserDto, [
  'email',
  'password',
]) {}
