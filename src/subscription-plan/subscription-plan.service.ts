import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { SubscriptionPlan } from './schema/subscription-plan.schema';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectModel(SubscriptionPlan.name)
    private subscriptionPlanModel: Model<SubscriptionPlan>,
  ) {}

  async create(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    try {
      const createdCat = new this.subscriptionPlanModel(
        createSubscriptionPlanDto,
      );
      return createdCat.save();
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    try {
      return this.subscriptionPlanModel.find().exec();
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionPlan`;
  }

  update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return `This action updates a #${id} subscriptionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionPlan`;
  }
}
