import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from './entity/Game';
import { Review } from './entity/Review';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'gamerave',
  synchronize: true,
  logging: true,
  entities: [Game, Review],
  migrations: ['./src/migration/**.ts'],
  subscribers: []
});
