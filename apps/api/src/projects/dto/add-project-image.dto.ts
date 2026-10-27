import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl } from 'class-validator';

export class AddProjectImageDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsString()
  @IsOptional()
  publicId?: string;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

