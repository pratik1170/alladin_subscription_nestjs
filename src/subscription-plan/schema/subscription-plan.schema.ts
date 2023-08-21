import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type SubscriptionPlanDocument = HydratedDocument<SubscriptionPlan>;

export enum DurationTypeEnum {
  days = 'days',
  weeks = 'weeks',
}

@Schema()
export class SubscriptionPlan {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, type: String, enum: DurationTypeEnum })
  duration_type: DurationTypeEnum;

  @Prop({ required: true })
  number_of_user: number;
}

export const SubscriptionPlanSchema =
  SchemaFactory.createForClass(SubscriptionPlan);
