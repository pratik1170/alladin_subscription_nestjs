import { Module } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCardController } from './credit-card.controller';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  controllers: [CreditCardController],
  providers: [CreditCardService, StripeService],
})
export class CreditCardModule {}
