export interface BasePrimaryKey {
  id: string;
}

export class IResponse<T> {
  code: number;
  error?: string;
  data?: T;
}
