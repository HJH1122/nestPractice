import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '../tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/${process.env.NODE_ENV || 'development'}.env`

    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>("DB_TYPE") as 'postgres',
        host: configService.get<string>("DB_HOST"), 
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),

        //엔티티 로드 설정
        autoLoadEntities: true,
        //데이터베이스 스키마 동기화(개발환경에서만)
        synchronize: configService.get("NODE_ENV") === 'development',
        
      })
    }),

    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
