import { Controller, Get, Response, Post, Body, ValidationPipe, Res, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginlDto } from './auth/dto/login.dto';
import { User } from './auth/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
