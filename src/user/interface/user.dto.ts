import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

// BASE
import { PaginationRequest } from '@/base/base.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}

class FilterAllUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}

export class PaginationFilterUserDto extends PaginationRequest<
  FilterAllUserDto
> {
  @ValidateNested()
  entity?: FilterAllUserDto;
}
