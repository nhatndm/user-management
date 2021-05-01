import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

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
  number?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}

export class FilterAllUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}
