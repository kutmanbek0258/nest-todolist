// import * as mongoose from 'mongoose';
// import * as validator from 'validator';
// import * as bcrypt from 'bcrypt';
//
// export const UserEntity = new mongoose.Schema ({
//     fullName: {
//         type: String,
//         minlength: 6,
//         maxlength: 255,
//         required: [true, 'NAME_IS_BLANK'],
//     },
//     email: {
//         type: String,
//         lowercase: true,
//         validate: validator.isEmail,
//         maxlength: 255,
//         minlength: 6,
//         required: [true, 'EMAIL_IS_BLANK'],
//     },
//     password: {
//         type: String,
//         minlength: 5,
//         maxlength: 1024,
//         required: [true, 'PASSWORD_IS_BLANK'],
//     },
//     bankAccountNumber: {
//         type: String,
//         maxlength: 32,
//     },
//     bankAccountOwnerName: {
//         type: String,
//         minlength: 6,
//         maxlength: 255,
//     },
//     roles: {
//         type: [String],
//         default: ['user'],
//     },
//     verification: {
//         type: Number,
//         unique: true
//     },
//     verified: {
//         type: Boolean,
//         default: false,
//     },
//     verificationExpires: {
//         type: Date,
//         default: () => Date.now() + 3*1000,
//     },
//     loginAttempts: {
//         type: Number,
//         default: 0,
//     },
//     blockExpires: {
//       type: Date,
//       default: Date.now,
//     },
// }, {
//     versionKey: false,
//     timestamps: true,
// });
//
// UserEntity.pre('save', async function(next) {
//     try {
//       if (!this.isModified('password')) {
//         return next();
//       }
//       // tslint:disable-next-line:no-string-literal
//       const hashed = await bcrypt.hash(this['password'], 10);
//       // tslint:disable-next-line:no-string-literal
//       this['password'] = hashed;
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   });

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

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Hash error');
    }
  }
}
