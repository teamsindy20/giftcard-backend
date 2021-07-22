import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CreateGiftcardPurchaseDto } from './dto/create-giftcard-purchase.dto';
import { UpdateGiftcardPurchaseDto } from './dto/update-giftcard-purchase.dto';
import { GiftcardPurchase } from './giftcard-purchase.entity';
import { GiftcardPurchasesService } from './giftcard-purchases.service';

@Controller('giftcard-purchases')
export class GiftcardPurchasesController {
  constructor(
    private readonly giftcardPurchasesService: GiftcardPurchasesService,
  ) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('user-id') userId?,
    @Query('username') username?,
    @Query('giftcard-id') giftcardId?,
    @Query('store-id') storeId?,
    @Query('store-name') storeName?,
  ): Promise<Pagination<GiftcardPurchase>> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      page,
      limit,
      route: '/v1/giftcard-purchases',
    };

    const searchOptions = {
      userId,
      username,
      giftcardId,
      storeId,
      storeName,
    };

    return this.giftcardPurchasesService.paginate(options, searchOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GiftcardPurchase> {
    return this.giftcardPurchasesService.findOne(id);
  }

  @Post()
  create(
    @Body() userData: CreateGiftcardPurchaseDto,
  ): Promise<GiftcardPurchase> {
    return this.giftcardPurchasesService.create(userData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userData: UpdateGiftcardPurchaseDto) {
    return this.giftcardPurchasesService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftcardPurchasesService.remove(id);
  }
}