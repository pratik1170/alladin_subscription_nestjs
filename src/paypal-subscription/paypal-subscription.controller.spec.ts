import { Test, TestingModule } from '@nestjs/testing';
import { PaypalSubscriptionController } from './paypal-subscription.controller';
import { PaypalSubscriptionService } from './paypal-subscription.service';

describe('PaypalSubscriptionController', () => {
  let controller: PaypalSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaypalSubscriptionController],
      providers: [PaypalSubscriptionService],
    }).compile();

    controller = module.get<PaypalSubscriptionController>(PaypalSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
