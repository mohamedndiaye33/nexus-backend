import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  // Convertir un prix en EUR vers une autre devise (USD, XOF, etc.)
  async convertPrice(amount: number, targetCurrency: string): Promise<number> {
    try {
      // Appel à une API de taux de change ouverte (ici basée sur l'Euro)
      const url = `https://open.er-api.com/v6/latest/EUR`;
      const response = await firstValueFrom(this.httpService.get(url));
      
      const rates = response.data.rates;
      const rate = rates[targetCurrency.toUpperCase()];

      if (!rate) {
        throw new HttpException(`Devise ${targetCurrency} non supportée.`, HttpStatus.BAD_REQUEST);
      }

      // Calcul du prix converti
      const convertedAmount = amount * rate;
      return parseFloat(convertedAmount.toFixed(2));
    } catch (error) {
      throw new HttpException(
        "Impossible de récupérer les taux de change pour le moment.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}