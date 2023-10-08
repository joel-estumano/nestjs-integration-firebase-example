import { Inject, Injectable, Logger } from '@nestjs/common';
import { app } from 'firebase-admin';
import { HeroCreateDto } from './dtos/hero-create.dto';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HerosService {
  private db: FirebaseFirestore.Firestore;
  private collection: FirebaseFirestore.CollectionReference;
  private logger = new Logger(HerosService.name);

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
    this.collection = this.db.collection('heros');
  }

  async create(dto: HeroCreateDto): Promise<any> {
    return new Promise<void>(async (resolve, reject) => {
      await this.collection
        .add(dto)
        .then((data: any) => {
          this.logger.log(data);
          resolve(data);
        })
        .catch((error) => {
          this.logger.error(error);
          reject(error);
        })
        .finally(() => {});
    });
  }

  async list(): Promise<Hero[]> {
    return new Promise((resolve, reject) => {
      this.collection
        .get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
          });
          this.logger.log(documents);
          resolve(documents);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
