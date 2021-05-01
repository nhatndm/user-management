import { Injectable } from '@nestjs/common';
import { Condition } from 'dynamoose';
import { InjectModel, Model, Document, ScanResponse } from 'nestjs-dynamoose';
import { User, UserKey } from './interface/user.interface';

// DOMAIN
import { Domain } from '@/constant/domain';

// INTERFACE
import { BaseService } from '@/base/base.service';

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

  findAll(user: Partial<User>): Promise<ScanResponse<Document<User>>> {
    const userCondition = new Condition();

    if (user.id) {
      userCondition.where('id').eq(user.id);
    }

    if (user.email) {
      userCondition.where('email').eq(user.email);
    }

    if (user.name) {
      userCondition.where('name').contains(user.name);
    }

    if (user.phone) {
      userCondition.where('phone').eq(user.phone);
    }

    return this.userModel.scan(userCondition).exec();
  }
}
