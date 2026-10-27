import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { SkillCategory } from '../../generated/prisma/enums.js';

export class UpdateSkillDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(SkillCategory)
  @IsOptional()
  category?: SkillCategory;

  @IsString()
  @IsOptional()
  iconUrl?: string;

  @IsString()
  @IsOptional()
  iconPublicId?: string;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  proficiency?: number;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

