import { Inject, Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { Credentials } from './user/user.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  @Inject(UserService) private readonly userService: UserService;

  async login(credentials: Credentials): Promise<User | null> {
    return await this.userService.login(credentials);
  }
}
