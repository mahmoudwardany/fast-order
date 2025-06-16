import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsString()
  @IsNotEmpty()
  restaurantName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsUrl()
  @IsNotEmpty()
  logo: string;
}
