import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { PaymentDetails } from './schema/payment-details.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StripeService } from 'src/stripe/stripe.service';
import { PaymentDetail } from './entities/payment-detail.entity';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectModel(PaymentDetails.name)
    private paymentDetailsModel: Model<PaymentDetails>,
    private stripeService: StripeService,
    private paymentsService: PaymentsService,
  ) {}

  async create(
    createPaymentDetailDto: CreatePaymentDetailDto,
  ): Promise<PaymentDetail> {
    try {
      const { amount, user_id, payment_method_id } =
        createPaymentDetailDto || {};
      const userPayment = await this.paymentsService.findOneByUserId(user_id);
      const { _id, stripe_customer_id } = userPayment || {};
      const makePaymentRes = await this.stripeService.makePayment(
        amount,
        stripe_customer_id,
        payment_method_id,
      );
      const obj: PaymentDetails = {
        user_id,
        payment_id: _id,
        amount,
        payment_method_id,
        payment_details: JSON.stringify(makePaymentRes),
        is_cancelled: false,
      };
      const paymentDetails = await this.paymentDetailsModel.create(obj);
      const createPaymentDetails = paymentDetails.save();
      return createPaymentDetails;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all paymentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDetail`;
  }

  update(id: number, updatePaymentDetailDto: UpdatePaymentDetailDto) {
    return `This action updates a #${id} paymentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDetail`;
  }

  public async createSubscription(createSubscriptionDto) {
    const { price_id, stripe_customer_id } = createSubscriptionDto || {};
    const subscriptions = await this.stripeService.subscriptionList(
      price_id,
      stripe_customer_id,
    );
    if (subscriptions.data.length) {
      throw new BadRequestException('User already subscribed');
    }
    return this.stripeService.createSubscription(price_id, stripe_customer_id);
  }

  public async getSubscription(price_id: string, stripe_customer_id: string) {
    const subscriptions = await this.stripeService.subscriptionList(
      price_id,
      stripe_customer_id,
    );

    if (!subscriptions.data.length) {
      return new NotFoundException('User not subscribed');
    }
    return subscriptions.data[0];
  }

  public async cancelSubscription(user_id: string) {
    const findPayment = await this.paymentDetailsModel.updateOne(
      {
        user_id,
      },
      {
        is_cancelled: true,
      },
    );

    if (findPayment) {
      const subscription_id = '';
      const subscriptionsCancelled =
        await this.stripeService.cancelSubscription(subscription_id);
      return subscriptionsCancelled;
    }
  }
}
