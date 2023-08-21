import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PaymentDetailsController } from './payment-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentDetails,
  PaymentDetailsSchema,
} from './schema/payment-details.schema';
import { StripeService } from 'src/stripe/stripe.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    PaymentsModule,
    MongooseModule.forFeature([
      { name: PaymentDetails.name, schema: PaymentDetailsSchema },
    ]),
  ],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService, StripeService],
})
export class PaymentDetailsModule {}
