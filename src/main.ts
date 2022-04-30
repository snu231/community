import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from './configs/config.service';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import * as config from 'config';

async function bootstrap() {
  //await makeOrmConfig();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  const port = serverConfig.port;

  app.use(cookieParser());
  
  await app.listen(port);

  Logger.log(`Application running on port ${ port }`);

}

async function makeOrmConfig() {

  const configService = new ConfigService(process.env );

  const typeormConfig = configService.getTypeOrmConfig();
  if (fs.existsSync('ormconfig.json')) {
    fs.unlinkSync('ormconfig.json');
  }

  fs.writeFileSync(
    'ormconfig.json',
    JSON.stringify(typeormConfig, null, 2)
  );

}

bootstrap();
