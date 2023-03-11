import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NmailerModule } from './nmailer/nmailer.module';
import { AppLoggerMiddleware } from './middleware/http-logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sMANovKutman',
      database: 'nest-todolist',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    NmailerModule,
    TodoModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
