import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';
import { Shop } from '../../references/shop/entities/shop.entity';
import { ShopService } from '../../references/shop/shop.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly shopService: ShopService,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    const shop: Shop = await this.shopService.findOneShort(
      createPriceDto.shopID,
    );
    const price: Price = this.priceRepository.create({ shop });
    return await this.priceRepository.save(price);
  }

  findAll() {
    return `This action returns all price`;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
