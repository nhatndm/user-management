import { Controller, Body, Post, Put, Get, Param } from '@nestjs/common';
import * as uuid from 'uuid';
import { Document, ScanResponse } from 'nestjs-dynamoose';
// import * as faker from 'faker';

// BASE
import { BaseController } from '@/base/base.controller';
import { IResponse, BasePrimaryKey } from '@/base/base.interface';

// SERVICE
import { UserService } from './user.service';

// CONSTANT
import { Domain } from '@/constant/domain';

// ENTITY
import { User } from './interface/user.interface';

// DTO
import {
  CreateUserDto,
  UpdateUserDto,
  PaginationFilterUserDto,
} from './interface/user.dto';

@Controller(Domain.USER.toLowerCase())
export class UserController implements BaseController<User> {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<IResponse<User>> {
    const newUser = await this.userService.create({
      ...createUserDto,
      id: uuid.v4(),
    });

    return {
      code: 200,
      data: newUser,
    };
  }

  @Put('/')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<IResponse<User>> {
    const updatedUser = await this.userService.update(
      { id: updateUserDto.id },
      updateUserDto,
    );

    return {
      code: 200,
      data: updatedUser,
    };
  }

  // @Get('/create-fake')
  // async createFakeData(): Promise<any> {
  //   const promiseList: Promise<any>[] = [];

  //   for (let i = 0; i < 1000; i++) {
  //     const user = {
  //       id: uuid.v4(),
  //       name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //       email: faker.internet.email(),
  //       phone: Number(faker.phone.phoneNumber('##########')),
  //     };

  //     promiseList.push(this.userService.create(user));
  //   }

  //   Promise.all(promiseList)
  //     .then(() => console.log('done'))
  //     .catch(e => console.log(e));

  //   return {
  //     code: 200,
  //   };
  // }

  @Get('/:id')
  async getOneById(@Param() params: BasePrimaryKey): Promise<IResponse<User>> {
    const foundUser = await this.userService.findOne({ id: params.id });

    return {
      code: 200,
      data: foundUser,
    };
  }

  @Post('/find/all')
  async getAll(
    @Body() filterUser: PaginationFilterUserDto,
  ): Promise<IResponse<ScanResponse<Document<User>>>> {
    const foundUser = await this.userService.findAll(filterUser);

    return {
      code: 200,
      data: foundUser,
    };
  }
}
