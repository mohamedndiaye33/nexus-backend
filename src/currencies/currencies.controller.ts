import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // Exemple d'appel : GET /currencies/convert?amount=100&to=USD
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
}