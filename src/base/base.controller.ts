// INTERFACE
import { IResponse, BasePrimaryKey } from './base.interface';

import { Document, QueryResponse, ScanResponse } from 'nestjs-dynamoose';

export interface BaseController<T> {
  getOneById(dto: BasePrimaryKey): Promise<IResponse<T>>;
  getAll(
    dto: T,
  ): Promise<IResponse<QueryResponse<Document<T>> | ScanResponse<Document<T>>>>;
  create(dto: T): Promise<IResponse<T>>;
  update(dto: T): Promise<IResponse<T>>;
}
