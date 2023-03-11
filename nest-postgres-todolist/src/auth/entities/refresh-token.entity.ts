// import { Schema } from 'mongoose';
//
// export const RefreshTokenSchema = new Schema ({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     refreshToken: {
//         type: String,
//         required: true,
//     },
//     ip: {
//         type: String,
//         required: true,
//     },
//     browser: {
//         type: String,
//         required: true,
//     },
//     country: {
//         type: String,
//         required: true,
//     },
// },
// {
//     versionKey: false,
//     timestamps: true,
// });

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
