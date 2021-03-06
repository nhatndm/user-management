/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

// RESPONSE
import { IResponse } from '../base/base.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  result = {};

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    this.result = {};

    if (errors.length > 0) {
      const data: IResponse<string> = {
        code: 400,
        error: JSON.stringify(this.buildError(errors)),
      };

      throw new HttpException(data, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private buildError(errors: ValidationError[]): Record<string, string> {
    errors.forEach(el => {
      const prop = el.property;

      if (el.children) {
        this.buildError(el.children);
      }

      if (el.constraints) {
        Object.entries(el.constraints).forEach(constraint => {
          this.result[prop + constraint[0]] = `${constraint[1]}`;
        });
      }
    });

    return this.result;
  }
}
