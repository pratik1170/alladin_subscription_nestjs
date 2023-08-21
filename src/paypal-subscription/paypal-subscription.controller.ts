import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaypalSubscriptionService } from './paypal-subscription.service';
import { CreatePaypalSubscriptionDto } from './dto/create-paypal-subscription.dto';
import { UpdatePaypalSubscriptionDto } from './dto/update-paypal-subscription.dto';
import { PaypalService } from 'src/paypal/paypal.service';

@Controller('paypal-subscription')
export class PaypalSubscriptionController {
  constructor(
    private readonly paypalSubscriptionService: PaypalSubscriptionService,
    private readonly paypalService: PaypalService,
  ) {}

  @Post()
  create(@Body() createPaypalSubscriptionDto: CreatePaypalSubscriptionDto) {
    return this.paypalSubscriptionService.create(createPaypalSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.paypalSubscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paypalSubscriptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaypalSubscriptionDto: UpdatePaypalSubscriptionDto,
  ) {
    return this.paypalSubscriptionService.update(
      +id,
      updatePaypalSubscriptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paypalSubscriptionService.remove(+id);
  }

  @Post('/orders')
  async createOrder() {
    try {
      const response = await this.paypalService.createOrder();
      console.log('createOrder response', response);
      return response;
    } catch (error) {
      throw new HttpException(
        'Failed to create order.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/orders/:orderID/capture')
  async captureOrder(@Param('orderID') orderID: string) {
    try {
      const response = await this.paypalService.capturePayment(orderID);
      console.log('captureOrder response', response);
      return response;
    } catch (error) {
      throw new HttpException(
        'Failed to capture order.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
