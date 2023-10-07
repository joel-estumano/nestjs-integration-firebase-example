import { Module } from '@nestjs/common';
import { HerosController } from './heros.controller';
import { HerosService } from './heros.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [HerosController],
  providers: [HerosService],
  imports: [FirebaseModule],
})
export class HerosModule {}
