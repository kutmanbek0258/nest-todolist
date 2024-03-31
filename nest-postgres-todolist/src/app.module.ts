import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { NmailerModule } from './nmailer/nmailer.module';
import { AppLoggerMiddleware } from './middleware/http-logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from './data-source';
import { ReferencesModule } from './references/references.module';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './documents/document.module';
import { ThermalPrinterModule } from './thermal-printer/thermal-printer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        migrations: [DataSource],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    NmailerModule,
    ReferencesModule,
    DocumentModule,
    ThermalPrinterModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
