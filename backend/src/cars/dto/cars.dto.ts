import {
    IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICars, ICarsUpdate } from '../interface/cars.interface';

export class CarsDto implements ICars {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'cars model',
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsUUID()
  @MinLength(3)
  model: string;

  @ApiProperty({
    type: String,
    description: 'cars title',
    default: 'malibu',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    type: Boolean,
    description: 'cars tanirovka',
    default: 'true',
  })
  @IsBoolean()
  tanirovka: boolean;

  @ApiProperty({
    type: Number,
    description: 'cars motor',
    default: 1.6,
  })
  @IsNumber()
  motor: number;

  @ApiProperty({
    type: Number,
    description: 'cars year',
    default: 2023,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    type: String,
    description: 'cars color',
    default: 'black',
  })
  @IsString()
  color: string;

  @ApiProperty({
    type: String,
    description: 'cars distance',
    default: '3000 km',
  })
  @IsString()
  distance: string;

  @ApiProperty({
    type: String,
    description: 'cars gearbook',
    default: 'avtomat karobka',
  })
  @IsString()
  gearbook: string;

  @ApiProperty({
    type: String,
    description: 'cars description',
    default: 'oganla maza qilad ...',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'cars narx',
    default: 2000000,
  })
  @IsNumber()
  narx: number;

  @ApiProperty({
    type: String,
    description: 'Enter img_model  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  img_model: string;

  @ApiProperty({
    type: String,
    description: 'Enter img_ichki  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  img_ichki: string;

  @ApiProperty({
    type: String,
    description: 'Enter img_tashqi  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  img_tashqi: string;
}
export class CarsUpdateDto implements ICarsUpdate {

  @ApiProperty({
    type: String,
    description: 'cars title',
    default: 'malibu',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    type: Boolean,
    description: 'cars tanirovka',
    default: 'true',
  })
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  tanirovka: boolean;

  @ApiProperty({
    type: Number,
    description: 'cars motor',
    default: 1.6,
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  motor: number;

  @ApiProperty({
    type: Number,
    description: 'cars year',
    default: 2023,
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    type: String,
    description: 'cars color',
    default: 'black',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  color: string;

  @ApiProperty({
    type: String,
    description: 'cars distance',
    default: '3000 km',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  distance: string;

  @ApiProperty({
    type: String,
    description: 'cars gearbook',
    default: 'avtomat karobka',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  gearbook: string;

  @ApiProperty({
    type: String,
    description: 'cars description',
    default: 'oganla maza qilad ...',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @ApiProperty({
    type: Number,
    description: 'cars narx',
    default: 2000000,
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  narx: number;

  @ApiProperty({
    type: String,
    description: 'Enter img_model  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  img_model: string;

  @ApiProperty({
    type: String,
    description: 'Enter img_ichki  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  img_ichki: string;

  @ApiProperty({
    type: String,
    description: 'Enter img_tashqi  url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  img_tashqi: string;
}

export class CarsCreateDto extends OmitType(CarsDto, ['id']) {}
