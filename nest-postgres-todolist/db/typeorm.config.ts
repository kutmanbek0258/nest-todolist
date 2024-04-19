import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [
    `${__dirname}/../src/user/entities/user.entity{.ts,.js}`,
    `${__dirname}/../src/user/entities/forgot-password.entity{.ts,.js}`,
    `${__dirname}/../src/auth/entities/refresh-token.entity{.ts,.js}`,
    `${__dirname}/../src/references/**/entities/*.entity{.ts,.js}`,
    `${__dirname}/../src/documents/**/entities/*.entity{.ts,.js}`,
  ],
  // synchronize: configService.get('nodenv') === 'development',
  // logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
