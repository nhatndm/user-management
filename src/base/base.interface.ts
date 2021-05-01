import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface BasePrimaryKey {
  id: string;
}

export class IResponse<T> {
  code: number;
  error?: string;
  data?: T;
}

export class PaginationRequest<T> {
  entity?: T;

  @IsOptional()
  @IsString()
  last_key?: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;
}

export class PaginationResponse<T> {
  data: T;
}
