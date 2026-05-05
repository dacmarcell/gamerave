import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from './entity/Game';
import { Review } from './entity/Review';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'gamerave',
  synchronize: true,
  logging: true,
  entities: [Game, Review, User],
  migrations: ['./src/migration/**.ts'],
  subscribers: []
});
