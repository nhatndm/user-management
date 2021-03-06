import { Document, QueryResponse, ScanResponse } from 'nestjs-dynamoose';

// INTERFACE
import { BasePrimaryKey } from './base.interface';

export interface BaseService<T> {
  create(domain: T): Promise<Document<T>>;
  update(key: BasePrimaryKey, domain: T): Promise<Document<T>>;
  findOne(key: BasePrimaryKey): Promise<Document<T>>;
  findAll(
    data: T,
  ): Promise<QueryResponse<Document<T>> | ScanResponse<Document<T>>>;
}
