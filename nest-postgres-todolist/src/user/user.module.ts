import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { NodeMailerModule } from 'src/nmailer/node-mailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ForgotPassword } from './entities/forgot-password.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([ForgotPassword]),
    AuthModule,
    NodeMailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
