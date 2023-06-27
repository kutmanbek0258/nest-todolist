import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ForgotPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  verification: number;

  @Column({ default: false })
  firstUsed: boolean;

  @Column({ default: false })
  finalUsed: boolean;

  @Column({ type: 'timestamptz' })
  expires: Date;

  @Column()
  ip: string;

  @Column()
  browser: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  ipChanged: string;

  @Column({ nullable: true })
  browserChanged: string;

  @Column({ nullable: true })
  countryChanged: string;
}
