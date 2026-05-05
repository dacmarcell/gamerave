import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Game } from './Game';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30
  })
  title: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @ManyToOne(() => Game, (game) => game.reviews, { eager: true })
  @JoinColumn()
  game: number;
}
