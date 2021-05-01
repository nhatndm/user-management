import { Controller, Body, Post, Put, Get, Param } from '@nestjs/common';
import * as uuid from 'uuid';
import { Document, ScanResponse } from 'nestjs-dynamoose';

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
  FilterAllUserDto,
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
    @Body() filterUser: FilterAllUserDto,
  ): Promise<IResponse<ScanResponse<Document<User>>>> {
    const foundUser = await this.userService.findAll(filterUser);

    return {
      code: 200,
      data: foundUser,
    };
  }
}
