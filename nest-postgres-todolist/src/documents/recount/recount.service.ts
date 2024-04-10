import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRecountDto } from './dto/create-recount.dto';
import { UpdateRecountDto } from './dto/update-recount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recount } from './entities/recount.entity';
import { Repository } from 'typeorm';
import { RecountItem } from './entities/recount-item.entity';
import { ProductService } from '../../references/product/product.service';
import { ShopService } from '../../references/shop/shop.service';
import { DepotService } from '../../references/depot/depot.service';
import { Shop } from '../../references/shop/entities/shop.entity';
import { Depot } from '../../references/depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';
import { AddRecountItemDto } from './dto/add-recount-item.dto';
import { Product } from '../../references/product/entities/product.entity';
import { UpdateRecountItemDto } from './dto/update-recount-item.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RecountService {
  constructor(
    @InjectRepository(Recount)
    private readonly recountRepository: Repository<Recount>,
    @InjectRepository(RecountItem)
    private readonly recountItemRepository: Repository<RecountItem>,
    private readonly productService: ProductService,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
  ) {}
  async create(user: User, createRecountDto: CreateRecountDto) {
    const shop: Shop = await this.shopService.findOneShort(
      createRecountDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      createRecountDto.depotID,
    );
    if (shop && depot) {
      const recount = this.recountRepository.create({
        shop,
        depot,
        status: 1,
        created_by: user,
      });
      return await this.recountRepository.save(recount);
    } else {
      throw new ForbiddenException({ message: 'references not found!' });
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.recountRepository.count();
    const recounts = await this.recountRepository.query(
      `
    SELECT recount.id, recount.status, recount.created_at,
           recount."shopId" AS shopid, s.name AS shopname,
           recount."depotId" AS depotid, d.name AS depotname,
           recount."createdById" AS createdById, u."fullName" AS createdByName
    FROM recount
    INNER JOIN shop s on s.id = recount."shopId"
    INNER JOIN depot d on d.id = recount."depotId"
    INNER JOIN "user" u on u.id = recount."createdById"
    ORDER BY recount.created_at DESC 
    LIMIT $1 OFFSET $2;`,
      [findAllDto.take, findAllDto.skip],
    );
    return { total, recounts };
  }

  async findOne(id: number) {
    return await this.recountRepository.query(
      `
    SELECT recount.id, recount.status,
           recount."shopId" AS shopid, s.name AS shopname,
           recount."depotId" AS depotid, d.name AS depotname,
           recount."createdById" AS createdById, u."fullName" AS createdByName
    FROM recount
    INNER JOIN shop s on s.id = recount."shopId"
    INNER JOIN depot d on d.id = recount."depotId"
    INNER JOIN "user" u on u.id = recount."createdById"
    WHERE recount.id = $1`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.recountRepository.findOneBy({ id: id });
  }

  async update(id: number, updateRecountDto: UpdateRecountDto) {
    const shop: Shop = await this.shopService.findOneShort(
      updateRecountDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      updateRecountDto.depotID,
    );
    if (shop && depot) {
      return await this.recountRepository.update(
        {
          id: id,
        },
        {
          shop,
          depot,
          status: updateRecountDto.status,
        },
      );
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async remove(id: number) {
    return await this.recountRepository.delete({ id: id });
  }

  async addItem(addRecountItem: AddRecountItemDto) {
    const recount: Recount = await this.findOneShort(addRecountItem.recountID);
    const product: Product = await this.productService.findOneShort(
      addRecountItem.productID,
    );
    if (recount && product) {
      const recountItem = this.recountItemRepository.create({
        recount,
        product,
        quantity: addRecountItem.quantity,
        price: addRecountItem.price,
      });
      return await this.recountItemRepository.save(recountItem);
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async fillItemsByAccountingQuantity(recountId: number) {
    return await this.recountRepository.query(
      `SELECT * FROM fill_recount_items_accounting_quantity($1);`,
      [recountId],
    );
  }

  async fillItemsActualQuantityByAccountingQuantity(recountId: number) {
    return await this.recountRepository.query(
      `SELECT * FROM fill_recount_items_actual_quantity_by_accounting_quantity($1);`,
      [recountId],
    );
  }

  async fillItemsPriceByRetailPrice(recountId: number) {
    return await this.recountRepository.query(
      `SELECT * FROM fill_recount_items_price_by_retail_price($1);`,
      [recountId],
    );
  }

  async fillItemsPriceByCost(recountId: number) {
    return await this.recountRepository.query(
      `SELECT * FROM fill_recount_items_price_by_cost($1);`,
      [recountId],
    );
  }

  async getAllItems(recountID: number) {
    return await this.recountItemRepository.query(
      `
        SELECT ri.id,
               ri."productId" AS productid, p.name AS productname,
               ri.quantity, ri.actual_quantity, ri.price
        FROM recount_item ri
        INNER JOIN product p on p.id = ri."productId"
        WHERE ri."recountId" = $1;`,
      [recountID],
    );
  }

  async updateItem(itemId: number, updateRecountItem: UpdateRecountItemDto) {
    const product: Product = await this.productService.findOneShort(
      updateRecountItem.productID,
    );
    if (product) {
      return await this.recountItemRepository.update(
        { id: itemId },
        {
          product,
          quantity: updateRecountItem.quantity,
          actual_quantity: updateRecountItem.actual_quantity,
          price: updateRecountItem.price,
        },
      );
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async deleteItem(itemId: number) {
    return await this.recountItemRepository.delete({ id: itemId });
  }
}
