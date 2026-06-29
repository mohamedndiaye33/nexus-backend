import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // <--- Vérifie bien cet import
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';

@Module({
  imports: [HttpModule], // <--- C'est ici qu'on donne l'accès à HttpService
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}