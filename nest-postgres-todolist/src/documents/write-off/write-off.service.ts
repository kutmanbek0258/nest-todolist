import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWriteOffDto } from './dto/create-write-off.dto';
import { UpdateWriteOffDto } from './dto/update-write-off.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WriteOff } from './entities/write-off.entity';
import { Repository } from 'typeorm';
import { ShopService } from '../../references/shop/shop.service';
import { DepotService } from '../../references/depot/depot.service';
import { User } from '../../user/entities/user.entity';
import { Shop } from '../../references/shop/entities/shop.entity';
import { Depot } from '../../references/depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class WriteOffService {
  constructor(
    @InjectRepository(WriteOff)
    private readonly writeOffRepository: Repository<WriteOff>,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
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
      `SELECT write_off.id AS id, write_off."shopId" AS shopid, write_off."depotId" AS depotid,
                       s.name AS shopname,
                       d.name AS depotname
                FROM write_off
                INNER JOIN shop s on s.id = write_off."shopId"
                INNER JOIN depot d on d.id = write_off."depotId"
                LIMIT $1 OFFSET $2`,
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

  update(id: number, updateWriteOffDto: UpdateWriteOffDto) {
    return `This action updates a #${id} writeOff`;
  }

  remove(id: number) {
    return `This action removes a #${id} writeOff`;
  }
}
