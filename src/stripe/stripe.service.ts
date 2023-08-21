import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async makePayment(
    amount: number,
    stripe_customer_id: string,
    payment_method_id: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: stripe_customer_id,
      setup_future_usage: 'off_session',
      payment_method: payment_method_id,
      currency: process.env.STRIPE_CURRENCY,
      confirm: true,
      description: 'Test by Pratik',
    });
  }

  public async setupCreditCard(
    payment_method_id: string,
    stripe_customer_id: string,
  ) {
    const paymentMethod = await this.stripe.paymentMethods.attach(
      payment_method_id,
      { customer: stripe_customer_id },
    );
    console.log('paymentMethod', paymentMethod);
    return this.stripe.setupIntents.create({
      customer: stripe_customer_id,
      payment_method: payment_method_id,
    });
  }

  public async creditCardsList(stripe_customer_id: string) {
    return this.stripe.paymentMethods.list({
      customer: stripe_customer_id,
      type: 'card',
    });
  }

  public async setDefaultCreditCard(
    payment_method_id: string,
    stripe_customer_id: string,
  ) {
    try {
      return await this.stripe.customers.update(stripe_customer_id, {
        invoice_settings: {
          default_payment_method: payment_method_id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  public async createSubscription(
    price_id: string,
    stripe_customer_id: string,
  ) {
    try {
      return await this.stripe.subscriptions.create({
        customer: stripe_customer_id,
        items: [
          {
            price: price_id,
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }

  public async subscriptionList(price_id: string, stripe_customer_id: string) {
    return this.stripe.subscriptions.list({
      customer: stripe_customer_id,
      price: price_id,
    });
  }

  public async cancelSubscription(subscription_id: string) {
    return this.stripe.subscriptions.cancel(subscription_id);
  }
}
