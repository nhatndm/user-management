import { Injectable } from '@nestjs/common';
import { Condition } from 'dynamoose';
import { InjectModel, Model, Document, ScanResponse } from 'nestjs-dynamoose';
import { User, UserKey } from './interface/user.interface';

// DOMAIN
import { Domain } from '@/constant/domain';

// INTERFACE
import { BaseService } from '@/base/base.service';
import { PaginationRequest } from '@/base/base.interface';

@Injectable()
export class UserService implements BaseService<User> {
  constructor(
    @InjectModel(Domain.USER)
    private userModel: Model<User, UserKey>,
  ) {}

  create(user: User): Promise<Document<User>> {
    return this.userModel.create(user);
  }

  update(key: UserKey, user: Partial<User>): Promise<Document<User>> {
    return this.userModel.update(key, user);
  }

  findOne(key: UserKey): Promise<Document<User>> {
    return this.userModel.get(key);
  }

  findAll(
    user: PaginationRequest<Partial<User>>,
  ): Promise<ScanResponse<Document<User>>> {
    const userCondition = new Condition();

    if (user.entity && user.entity.id) {
      userCondition.where('id').eq(user.entity.id);
    }

    if (user.entity && user.entity.email) {
      userCondition.where('email').eq(user.entity.email);
    }

    if (user.entity && user.entity.name) {
      userCondition.where('name').contains(user.entity.name);
    }

    if (user.entity && user.entity.phone) {
      userCondition.where('phone').eq(user.entity.phone);
    }

    if (user.last_key) {
      return this.userModel
        .scan(userCondition)
        .startAt({ id: user.last_key })
        .limit(user.limit)
        .exec();
    }

    return this.userModel
      .scan(userCondition)
      .limit(user.limit)
      .exec();
  }
}
