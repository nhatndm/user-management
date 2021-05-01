import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// MODULE
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { PipeModule } from './pipe/pipe.module';

@Module({
  imports: [PipeModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
