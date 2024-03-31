import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWriteOffDto } from './dto/create-write-off.dto';
import { UpdateWriteOffDto } from './dto/update-write-off.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WriteOff } from './entities/write-off.entity';
import { DataSource, Repository } from 'typeorm';
import { ShopService } from '../../references/shop/shop.service';
import { DepotService } from '../../references/depot/depot.service';
import { User } from '../../user/entities/user.entity';
import { Shop } from '../../references/shop/entities/shop.entity';
import { Depot } from '../../references/depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';
import { WriteOffItem } from './entities/write-off.item';
import { AddWriteOffItemDto } from './dto/add-write-off-item.dto';
import { ProductService } from '../../references/product/product.service';
import { UpdateWriteOffItemDto } from './dto/update-write-off-item.dto';
import { Product } from '../../references/product/entities/product.entity';

@Injectable()
export class WriteOffService {
  constructor(
    @InjectRepository(WriteOff)
    private readonly writeOffRepository: Repository<WriteOff>,
    @InjectRepository(WriteOffItem)
    private readonly writeOffItemRepository: Repository<WriteOffItem>,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
    private readonly productService: ProductService,
    private dataSource: DataSource,
  ) {}

  async create(user: User, createWriteOffDto: CreateWriteOffDto) {
    const shop: Shop = await this.shopService.findOneShort(
      createWriteOffDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      createWriteOffDto.depotID,
    );
    if (shop && depot) {
      const writeOff: WriteOff = this.writeOffRepository.create({
        shop,
        depot,
        created_by: user,
      });
      return await this.writeOffRepository.save(writeOff);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.writeOffRepository.count();
    const writeOffs = await this.writeOffRepository.query(
      `SELECT write_off.id AS id, write_off."shopId" AS shopid, write_off."depotId" AS depotid, write_off.created_at,
                       s.name AS shopname,
                       d.name AS depotname
                FROM write_off
                INNER JOIN shop s on s.id = write_off."shopId"
                INNER JOIN depot d on d.id = write_off."depotId"
                ORDER BY created_at DESC
                LIMIT $1 OFFSET $2;`,
      [findAllDto.take, findAllDto.skip],
    );
    return { total, writeOffs };
  }

  async findOne(id: number) {
    return await this.writeOffRepository.query(
      `SELECT write_off.id AS id,
                       write_off."createdById" AS createdbyid, u."fullName" AS createdbyname,
                       write_off."shopId" AS shopid, s.name AS shopname,
                       write_off."depotId" AS depotid, d.name AS depotname
                FROM write_off
                INNER JOIN "user" u on u.id = write_off."createdById"
                INNER JOIN shop s on s.id = write_off."shopId"
                INNER JOIN depot d on d.id = write_off."depotId"
                WHERE write_off.id = $1;`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.writeOffRepository.findOneBy({ id: id });
  }

  async update(id: number, updateWriteOffDto: UpdateWriteOffDto) {
    const shop: Shop = await this.shopService.findOneShort(
      updateWriteOffDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      updateWriteOffDto.depotID,
    );
    if (shop && depot) {
      return await this.writeOffRepository.update(
        { id: id },
        {
          shop,
          depot,
        },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.writeOffRepository.delete({ id: id });
  }

  async addItem(addWriteOffItemDto: AddWriteOffItemDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const writeOff = await this.findOneShort(addWriteOffItemDto.writeOffID);
    const product = await this.productService.findOneShort(
      addWriteOffItemDto.productID,
    );
    if (writeOff && product) {
      try {
        const writeOffItem = this.writeOffItemRepository.create({
          writeOff,
          product,
          quantity: addWriteOffItemDto.quantity,
          price: addWriteOffItemDto.price,
        });
        const newWriteOffItem = await queryRunner.manager.save(writeOffItem);
        await queryRunner.manager
          .query(`SELECT update_product_quantity($1)`, [
            addWriteOffItemDto.productID,
          ])
          .catch((error) => {
            throw new ForbiddenException({ message: error.message });
          });
        await queryRunner.commitTransaction();
        return newWriteOffItem;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new ForbiddenException();
    }
  }

  async getAllItems(writeOffId: number) {
    return await this.writeOffItemRepository.query(
      `SELECT write_off_item.id,
                       write_off_item."productId" AS productid, p.name AS productname,
                       write_off_item.quantity AS quantity, write_off_item.price AS price
                FROM write_off_item
                INNER JOIN product p on p.id = write_off_item."productId"
                WHERE write_off_item."writeOffId" = $1;`,
      [writeOffId],
    );
  }

  async updateItem(
    itemId: number,
    updateWriteOffItemDto: UpdateWriteOffItemDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const product: Product = await this.productService.findOneShort(
      updateWriteOffItemDto.productID,
    );
    if (product) {
      try {
        const item = {
          product: product,
          quantity: updateWriteOffItemDto.quantity,
          price: updateWriteOffItemDto.price,
        };
        const updatedItem = await queryRunner.manager.update(
          WriteOffItem,
          { id: itemId },
          item,
        );
        await queryRunner.manager
          .query(`SELECT update_product_quantity($1)`, [item.product.id])
          .catch((error) => {
            throw new ForbiddenException({ message: error.message });
          });
        await queryRunner.commitTransaction();
        return updatedItem;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new ForbiddenException();
    }
  }

  async deleteItem(itemId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const item = await this.writeOffItemRepository.findOne({
        where: { id: itemId },
        relations: ['product'],
      });
      await queryRunner.manager.delete(WriteOffItem, { id: itemId });
      await queryRunner.manager
        .query(`SELECT update_product_quantity($1)`, [item.product.id])
        .catch((error) => {
          throw new ForbiddenException({ message: error.message });
        });
      return item;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException();
    } finally {
      await queryRunner.release();
    }
  }
}
