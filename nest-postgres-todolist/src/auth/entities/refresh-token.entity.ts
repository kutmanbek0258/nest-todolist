import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column()
  refreshToken: string;

  @Column()
  ip: string;

  @Column()
  browser: string;

  @Column()
  country: string;
}
