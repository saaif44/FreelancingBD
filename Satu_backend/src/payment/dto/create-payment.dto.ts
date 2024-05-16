export class CreatePaymentDto {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
