// INTERFACE
import { IResponse, BasePrimaryKey } from './base.interface';

import { Document, ScanResponse } from 'nestjs-dynamoose';

export interface BaseController<T> {
  getOneById(dto: BasePrimaryKey): Promise<IResponse<T>>;
  getAll(dto: Partial<T>): Promise<IResponse<ScanResponse<Document<T>>>>;
  create(dto: T): Promise<IResponse<T>>;
  update(dto: T): Promise<IResponse<T>>;
}
