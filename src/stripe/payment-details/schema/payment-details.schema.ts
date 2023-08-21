import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PaymentDetailsDocument = HydratedDocument<PaymentDetails>;

@Schema()
export class PaymentDetails {
  _id?: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  payment_id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  payment_method_id: string;

  @Prop()
  payment_details: string;

  @Prop()
  is_cancelled: boolean;
}

export const PaymentDetailsSchema =
  SchemaFactory.createForClass(PaymentDetails);
