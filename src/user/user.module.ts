import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './user.schema';

// CONSTANT
import { Domain } from '@/constant/domain';

// SERVICE
import { UserService } from './user.service';

// CONTROLLER
import { UserController } from './user.controller';

@Module({
  imports: [
    DynamooseModule.forFeature([{ name: Domain.USER, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
