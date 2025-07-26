import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AbstractQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  offset?: number;
}
