import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class PaypalService {
  private readonly base = 'https://api-m.sandbox.paypal.com';
  private readonly CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  private readonly APP_SECRET = process.env.PAYPAL_CLIENT_SECRET;

  private async generateAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(`${this.CLIENT_ID}:${this.APP_SECRET}`).toString(
        'base64',
      );
      const response = await fetch(`${this.base}/v1/oauth2/token`, {
        method: 'post',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to generate Access Token:', error);
      throw error;
    }
  }

  async createOrder() {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '0.02',
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  async capturePayment(orderID: string) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return this.handleResponse(response);
  }

  private async handleResponse(response: any) {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
