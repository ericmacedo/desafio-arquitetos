import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
