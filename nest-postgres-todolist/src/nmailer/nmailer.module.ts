import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NmailerService } from './nmailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'smanovkutman0258@gmail.com',
          pass: 'bhppojvjybyllxet',
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>',
      },
      template: {},
    }),
  ],
  providers: [NmailerService],
  exports: [NmailerService],
})
export class NmailerModule {}
