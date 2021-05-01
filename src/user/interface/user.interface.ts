/* eslint-disable @typescript-eslint/no-empty-interface */
// BASE
import { BasePrimaryKey } from '../../base/base.interface';

export interface UserKey extends BasePrimaryKey {}

export interface User extends UserKey {
  name: string;
  email: string;
  phone: number;
}
