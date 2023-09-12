import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';
import { Shop } from '../../references/shop/entities/shop.entity';
import { ShopService } from '../../references/shop/shop.service';
import { FindAllDto } from './dto/find-all.dto';
import { User } from '../../user/entities/user.entity';
import { PriceItem } from './entities/price-item.entity';
import { ProductService } from '../../references/product/product.service';
import { AddPriceItemDto } from './dto/add-price-item.dto';
import { Product } from '../../references/product/entities/product.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(PriceItem)
    private readonly priceItemRepository: Repository<PriceItem>,
    private readonly shopService: ShopService,
    private readonly productService: ProductService,
  ) {}

  async create(user: User, createPriceDto: CreatePriceDto) {
    const shop: Shop = await this.shopService.findOneShort(
      createPriceDto.shopID,
    );
    const price: Price = this.priceRepository.create({
      shop,
      created_by: user,
    });
    return await this.priceRepository.save(price);
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.priceRepository.query(
      `SELECT p.id,
             s.id AS shopid, s.name AS shopname
      FROM price p
      INNER JOIN shop s on s.id = p."shopId"
      LIMIT $1 OFFSET $2`,
      [findAllDto.take, findAllDto.skip],
    );
  }

  async findOne(id: number) {
    return await this.priceRepository.query(
      `SELECT p.id,
             s.id AS shopid, s.name AS shopname,
             u.id AS createdbyid, u."fullName" createdbyname,
             p.created_at, p.updated_at
      FROM price p
      INNER JOIN shop s on s.id = p."shopId"
      INNER JOIN "user" u on u.id = p."createdById"
      WHERE p.id = $1`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.priceRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const shop: Shop = await this.shopService.findOneShort(
      updatePriceDto.shopID,
    );
    return await this.priceRepository.update(
      { id: id },
      {
        shop,
      },
    );
  }

  async remove(id: number) {
    return await this.priceRepository.delete({ id: id });
  }

  async addItem(addPriceItemDto: AddPriceItemDto) {
    const price: Price = await this.findOneShort(addPriceItemDto.priceID);
    const product: Product = await this.productService.findOneShort(
      addPriceItemDto.productID,
    );
    if (price && product) {
      const priceItem = this.priceItemRepository.create({
        price,
        product,
        retail_price: addPriceItemDto.retail_price,
      });
      return await this.priceItemRepository.save(priceItem);
    } else {
      throw new ForbiddenException({ message: 'references not found!' });
    }
  }

  async getAllItems(priceId: number) {
    return await this.priceItemRepository.query(
      `SELECT pi.id,
             p.name AS productname, p.id AS productname,
             retail_price
      FROM price_item pi
      INNER JOIN product p on p.id = pi."productId"
      WHERE pi.id = $1`,
      [priceId],
    );
  }
}
