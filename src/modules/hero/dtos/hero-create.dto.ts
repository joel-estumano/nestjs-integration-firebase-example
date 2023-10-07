import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { HeroInterface } from '../entities/hero.entity';

export class HeroCreateDto implements HeroInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
