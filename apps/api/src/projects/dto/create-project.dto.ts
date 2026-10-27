import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  slug!: string;

  @IsString()
  @IsNotEmpty()
  summary!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  thumbnailUrl!: string;

  @IsString()
  @IsOptional()
  thumbnailPublicId?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

