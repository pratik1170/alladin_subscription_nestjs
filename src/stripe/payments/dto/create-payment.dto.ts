export class CreatePaymentDto {
  user_id: string;
  payment_option: string;
  stripe_customer_id: string;
}
