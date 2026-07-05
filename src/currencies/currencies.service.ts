import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  // Convertir un montant depuis EUR vers une autre devise
  async convertPrice(amount: number, targetCurrency: string): Promise<number> {
    try {
      const url = `https://open.er-api.com/v6/latest/EUR`;
      const response = await firstValueFrom(this.httpService.get(url));
      const rates = response.data.rates;
      const rate = rates[targetCurrency.toUpperCase()];

      if (!rate) {
        throw new HttpException(
          `Devise ${targetCurrency} non supportée.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return parseFloat((amount * rate).toFixed(2));
    } catch (error) {
      throw new HttpException(
        'Impossible de récupérer les taux de change.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ✅ Nouveau : récupère les taux de change depuis XOF (FCFA)
  // Le XOF est fixé à l'EUR : 1 EUR = 655.957 XOF
  // On calcule EUR/USD/GBP depuis XOF en passant par EUR
  async getRatesFromXOF(): Promise<{ EUR: number; USD: number; GBP: number }> {
    try {
      const url = `https://open.er-api.com/v6/latest/EUR`;
      const response = await firstValueFrom(this.httpService.get(url));
      const rates = response.data.rates;

      // Taux fixe XOF/EUR garanti par la Banque de France
      const XOF_PER_EUR = 655.957;

      return {
        EUR: parseFloat((1 / XOF_PER_EUR).toFixed(8)),         // 1 FCFA en EUR
        USD: parseFloat((rates['USD'] / XOF_PER_EUR).toFixed(8)), // 1 FCFA en USD
        GBP: parseFloat((rates['GBP'] / XOF_PER_EUR).toFixed(8)), // 1 FCFA en GBP
      };
    } catch {
      throw new HttpException(
        'Impossible de récupérer les taux de change.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
