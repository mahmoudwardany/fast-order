import { IsOptional, IsString } from 'class-validator';

export class AdminCommentDto {
  @IsOptional()
  @IsString()
  adminComment?: string;
}
