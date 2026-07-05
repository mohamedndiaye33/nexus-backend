import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // Convertit depuis EUR : GET /currencies/convert?amount=100&to=USD
  @Get('convert')
  async convert(
    @Query('amount', ParseFloatPipe) amount: number,
    @Query('to') to: string,
  ) {
    const convertedPrice = await this.currenciesService.convertPrice(amount, to);
    return {
      originalAmount: amount,
      currencyFrom: 'EUR',
      currencyTo: to.toUpperCase(),
      convertedAmount: convertedPrice,
    };
  }

  // ✅ Nouveau : récupère tous les taux depuis XOF (FCFA)
  // Utilisé par le frontend pour convertir les prix FCFA → EUR / USD
  // GET /currencies/rates
  @Get('rates')
  async getRates() {
    const rates = await this.currenciesService.getRatesFromXOF();
    return {
      base: 'XOF',
      rates,
    };
  }
}
