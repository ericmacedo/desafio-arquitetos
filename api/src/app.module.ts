import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { dataSourceOptions } from 'db/data-source';

const clientResources = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../..', 'user', 'dist')
});
  
const dbModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [
    clientResources, dbModule, UserModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService]})
export class AppModule {}
