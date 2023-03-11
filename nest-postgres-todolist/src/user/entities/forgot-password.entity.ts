// import { Schema } from 'mongoose';
// import * as validator from 'validator';
//
// export const ForgotPasswordEntity = new Schema ({
//     email: {
//         required: [true, 'EMAIL_IS_BLANK'],
//         type: String,
//         requierd: true,
//     },
//     verification: {
//         type: String,
//         validate: Number,
//         requierd: true,
//     },
//     firstUsed: {
//         type: Boolean,
//         default: false,
//     },
//     finalUsed: {
//         type: Boolean,
//         default: false,
//     },
//     expires: {
//         type: Date,
//         requierd: true,
//     },
//     ip: {
//         type: String,
//         requierd: true,
//     },
//     browser: {
//         type: String,
//         requierd: true,
//     },
//     country: {
//         type: String,
//         requierd: true,
//     },
//     ipChanged: {
//         type: String,
//     },
//     browserChanged: {
//         type: String,
//     },
//     countryChanged: {
//         type: String,
//     },
// },
// {
//     versionKey: false,
//     timestamps: true,
// });

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
