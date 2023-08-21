import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }
  async create(createProductDto: CreateProductDto) {
    const { product_name } = createProductDto || {};
    const product = await this.stripe.products.create({
      name: product_name,
    });
    return product;
  }

  findAll() {
    return this.stripe.products.list();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
