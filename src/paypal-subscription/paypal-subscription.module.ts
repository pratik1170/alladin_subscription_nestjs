import { Module } from '@nestjs/common';
import { PaypalSubscriptionService } from './paypal-subscription.service';
import { PaypalSubscriptionController } from './paypal-subscription.controller';
import { PaypalService } from 'src/paypal/paypal.service';

@Module({
  controllers: [PaypalSubscriptionController],
  providers: [PaypalSubscriptionService, PaypalService],
})
export class PaypalSubscriptionModule {}
