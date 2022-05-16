import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Res,
  Delete,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginlDto } from './auth/dto/login.dto';
import { User } from './auth/user.entity';

import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request ): string {
    return "eer";
    /*return `
      <button > hello</button>

      <script>
      async  onButtonClicked = () => {
        let data = await fetch('/boom', {
          credentials: 'same-origin',
          headers : {
            'CSRF-Token' : value = "${request.csrfToken()}"
          },
          method: 'Post'

          let text = await data.text();
          alert(text);

        })
      }
      </script>
    `;*/
  }
}
