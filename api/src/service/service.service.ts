import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) { }
  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  findAll(query: any = {}) {
    return Object.keys(query).length === 0
      ? this.serviceRepository.find()
      : this.serviceRepository.findBy(query);
  }

  findOne(id: number) {
    return this.serviceRepository.findOneBy({ id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    return this.serviceRepository.save({ ...service, ...updateServiceDto });
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    return this.serviceRepository.remove(service);
  }
}
