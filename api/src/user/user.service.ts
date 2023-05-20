import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(query: any = {}) {
    return Object.keys(query).length === 0
      ? this.userRepository.find()
      : this.userRepository.findBy(query);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async login({ email, password }: Credentials): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user.password === password ? user : null;
  }
}
