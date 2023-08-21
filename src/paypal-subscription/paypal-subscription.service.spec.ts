import { Test, TestingModule } from '@nestjs/testing';
import { PaypalSubscriptionService } from './paypal-subscription.service';

describe('PaypalSubscriptionService', () => {
  let service: PaypalSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaypalSubscriptionService],
    }).compile();

    service = module.get<PaypalSubscriptionService>(PaypalSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
