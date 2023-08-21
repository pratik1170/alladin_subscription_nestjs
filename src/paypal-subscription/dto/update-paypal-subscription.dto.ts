import { PartialType } from '@nestjs/mapped-types';
import { CreatePaypalSubscriptionDto } from './create-paypal-subscription.dto';

export class UpdatePaypalSubscriptionDto extends PartialType(CreatePaypalSubscriptionDto) {}
