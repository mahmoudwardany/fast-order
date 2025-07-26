import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateMenuItemsDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  restaurantId: number;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
