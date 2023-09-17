import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({ //conecta com o banco postgres vendas no servidor docker porta 5432
      type: 'postgres',
      database: process.env.DB_DATABASE,//essas informacoes estao arquivo .env.development.local 
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      //synchronize: true,//apenas em tempo de execucao, ideal seria false, true ele cria banco automatico
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],//poderia colocar uma por uma entities: [UserEntity]
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
