import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { typeORMConfig } from './configs/typeorm.config';
import { AppleModule } from './apple/apple.module';

@Module({
  imports: [ 
   BoardsModule, 
  TypeOrmModule.forRoot(typeORMConfig), AppleModule,
  ],
  
  controllers: [AppController],
  providers: [AppService  ],
})
export class AppModule {}
