// INTERFACE
import { IResponse, BasePrimaryKey, PaginationRequest } from './base.interface';

import { Document, ScanResponse } from 'nestjs-dynamoose';

export interface BaseController<T> {
  getOneById(dto: BasePrimaryKey): Promise<IResponse<T>>;
  getAll(
    dto: PaginationRequest<T>,
  ): Promise<IResponse<ScanResponse<Document<T>>>>;
  create(dto: T): Promise<IResponse<T>>;
  update(dto: T): Promise<IResponse<T>>;
}
