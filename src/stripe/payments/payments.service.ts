import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Payments } from './schema/payments.schema';
import { UsersService } from 'src/users/users.service';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments.name)
    private paymentsModel: Model<Payments>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private stripeService: StripeService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const { user_id, payment_option } = createPaymentDto || {};
      const user = await this.usersService.findOne(user_id);
      const { name, email } = user || {};
      if (payment_option === 'STRIPE') {
        // TODO check that user already created as customer or not
        const createCustomer = await this.stripeService.createCustomer(
          name,
          email,
        );
        createPaymentDto.stripe_customer_id = createCustomer.id;
        const initPayments = new this.paymentsModel(createPaymentDto);
        return initPayments.save();
      } else {
      }
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async findOneByUserId(id: string): Promise<Payment> {
    try {
      const userPayment = await this.paymentsModel.findOne({ user_id: id });
      return userPayment;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
