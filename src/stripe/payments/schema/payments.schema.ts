import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PaymentsDocument = HydratedDocument<Payments>;

export enum PaymentOptionEnum {
  stripe = 'STRIPE',
  paypal = 'PAYPAL',
}

@Schema()
export class Payments {
  _id: string;

  @Prop({ required: true, unique: true })
  user_id: string;

  @Prop({ required: true, type: String, enum: PaymentOptionEnum })
  payment_option: PaymentOptionEnum;

  @Prop({ required: true })
  stripe_customer_id: string;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
