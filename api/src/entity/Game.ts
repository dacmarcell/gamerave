import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index
} from 'typeorm';
import { Review } from './Review';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30
  })
  @Index({ unique: true })
  name: string;

  @Column()
  likes: number;

  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];
}
