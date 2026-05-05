import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Game } from './Game';
import { User } from './User';

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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;
}
