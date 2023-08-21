import { Injectable } from '@nestjs/common';
import { CreatePaypalSubscriptionDto } from './dto/create-paypal-subscription.dto';
import { UpdatePaypalSubscriptionDto } from './dto/update-paypal-subscription.dto';

@Injectable()
export class PaypalSubscriptionService {
  create(createPaypalSubscriptionDto: CreatePaypalSubscriptionDto) {
    return 'This action adds a new paypalSubscription';
  }

  findAll() {
    return `This action returns all paypalSubscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypalSubscription`;
  }

  update(id: number, updatePaypalSubscriptionDto: UpdatePaypalSubscriptionDto) {
    return `This action updates a #${id} paypalSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypalSubscription`;
  }
}
