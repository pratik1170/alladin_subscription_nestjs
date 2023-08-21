import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.create(createCreditCardDto);
  }

  @Get(':stripe_customer_id')
  findAll(@Param('stripe_customer_id') stripe_customer_id: string) {
    return this.creditCardService.findAll(stripe_customer_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ) {
    return this.creditCardService.update(+id, updateCreditCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardService.remove(+id);
  }
}
