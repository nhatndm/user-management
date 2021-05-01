import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNpm } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [
    ConfigModuleNpm.forRoot({
      isGlobal: true,
    }),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
        region: process.env.AWS_REGION,
      },
    }),
  ],
})
export class ConfigModule {}
