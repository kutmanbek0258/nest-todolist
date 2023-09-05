import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { Receipt } from '../../documents/receipt/entities/receipt.entity';
import { WriteOff } from '../../documents/write-off/entities/write-off.entity';
import { Recount } from '../../documents/recount/entities/recount.entity';
import { Price } from '../../documents/price/entities/price.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column({ unique: true })
  verification: number;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP' + 3 * 1000,
  })
  verificationExpires: Date;

  @Column({ default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  blockExpires: Date;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Receipt, (receipt) => receipt.created_by)
  receipts: Receipt[];

  @OneToMany(() => WriteOff, (writeOff) => writeOff.created_by)
  writeOffs: WriteOff[];

  @OneToMany(() => Recount, (recount) => recount.created_by)
  recounts: Recount[];

  @OneToMany(() => Price, (price) => price.created_by)
  prices: Price[];

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Hash error');
    }
  }
}
