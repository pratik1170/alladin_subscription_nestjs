import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './stripe/products/products.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { UsersModule } from './users/users.module';
import { PaymentDetailsModule } from './stripe/payment-details/payment-details.module';
import { CreditCardModule } from './stripe/credit-card/credit-card.module';
import { PaymentsModule } from './stripe/payments/payments.module';
import { PaypalService } from './paypal/paypal.service';
import { PaypalSubscriptionModule } from './paypal-subscription/paypal-subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    SubscriptionPlanModule,
    MongooseModule.forRoot('mongodb://localhost/alladin-subscription'),
    UsersModule,
    PaymentsModule,
    PaymentDetailsModule,
    CreditCardModule,
    PaypalSubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaypalService],
})
export class AppModule {}
