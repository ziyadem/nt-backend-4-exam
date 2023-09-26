import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IModel, IModelUpdate } from '../interface/model.interface';



export class ModelDto implements IModel {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter company marka',
    default: 'lada',
  })
  @IsString()
  @MinLength(3)
  marka: string;

  @ApiProperty({
    type: String,
    description: 'Enter your img url',
    default: 'http://www.ziyada.com/images/logo.png',
  })
  @IsUrl()
  img: string;

}

export class ModelUpdateDto implements IModelUpdate {
  @ApiProperty({
    type: String,
    description: 'Enter your marka',
    default: 'lada',
  })
  @IsOptional()
  @IsNotEmpty()
  marka: string;

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

export class ModelCreateDto extends OmitType(ModelDto,['id']){}
