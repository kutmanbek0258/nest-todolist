import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NMailerService } from './n-mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('NMAILER_HOST'),
          port: +configService.get('NMAILER_PORT'),
          secure: false,
          auth: {
            user: configService.get('NMAILER_USER'),
            pass: configService.get('NMAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"nest-modules" <user@outlook.com>',
        },
        template: {},
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NMailerService],
  exports: [NMailerService],
})
export class NmailerModule {}
