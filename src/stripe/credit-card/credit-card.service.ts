import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class CreditCardService {
  constructor(private readonly stripeService: StripeService) {}

  create(createCreditCardDto: CreateCreditCardDto) {
    const { payment_method_id, stripe_customer_id } = createCreditCardDto || {};
    return this.stripeService.setupCreditCard(
      payment_method_id,
      stripe_customer_id,
    );
  }

  findAll(stripe_customer_id: string) {
    return this.stripeService.creditCardsList(stripe_customer_id);
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  update(id: number, updateCreditCardDto: UpdateCreditCardDto) {
    return `This action updates a #${id} creditCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }

  setDefault(payment_method_id: string, stripe_customer_id: string) {
    return this.stripeService.setDefaultCreditCard(
      payment_method_id,
      stripe_customer_id,
    );
  }
}
