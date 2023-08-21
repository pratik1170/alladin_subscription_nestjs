import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payments, PaymentsSchema } from './schema/payments.schema';
import { UsersModule } from 'src/users/users.module';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Payments.name, schema: PaymentsSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
