import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Credentials } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Post("login")
  async login(@Body() credentials: Credentials) {
    return await this.appService.login(credentials);
  }
}
