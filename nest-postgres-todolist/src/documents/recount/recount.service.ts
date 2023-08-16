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
  async create(createRecountDto: CreateRecountDto) {
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
        status: 0,
        start_date: createRecountDto.startDate,
        end_date: createRecountDto.endDate,
      });
      return await this.recountRepository.save(recount);
    } else {
      throw new ForbiddenException({ message: 'references not found!' });
    }
  }

  async findAll(findAllDto: FindAllDto) {
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
    LIMIT $1 OFFSET $2;`,
      [findAllDto.take, findAllDto.skip],
    );
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

  update(id: number, updateRecountDto: UpdateRecountDto) {
    return `This action updates a #${id} recount`;
  }

  remove(id: number) {
    return `This action removes a #${id} recount`;
  }
}
