import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helpers/env.helper';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './common/configs/firebase.config';
import { HerosModule } from './modules/hero/heros.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);

@Module({
  imports: [
    HerosModule,
    FirebaseModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [firebaseConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
