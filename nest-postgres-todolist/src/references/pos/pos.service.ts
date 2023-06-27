import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePosDto } from './dto/create-pos.dto';
import { UpdatePosDto } from './dto/update-pos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pos } from './entities/pos.entity';
import { Repository } from 'typeorm';
import { ShopService } from '../shop/shop.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(Pos) private readonly posRepository: Repository<Pos>,
    private readonly shopService: ShopService,
  ) {}

  async create(createPosDto: CreatePosDto) {
    const shop = await this.shopService.findOneShort(createPosDto.shopID);
    if (shop) {
      const pos = await this.posRepository.create({
        name: createPosDto.name,
        shop: shop,
      });
      return await this.posRepository.save(pos);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.posRepository.count();
    const poses = await this.posRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, poses };
  }

  async findOne(id: number) {
    return await this.posRepository.query(
      `SELECT pos.id, pos.name,
               s.id AS shopId, s.name AS shopName
        FROM pos
        INNER JOIN shop s on pos."shopId" = s.id
        WHERE pos.id = ${id};`,
    );
  }

  async findOneShort(id: number) {
    return await this.posRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePosDto: UpdatePosDto) {
    const shop = await this.shopService.findOne(updatePosDto.shopID);
    if (shop) {
      return await this.posRepository.update(
        { id: id },
        { shop: shop, name: updatePosDto.name },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.posRepository.delete({ id: id });
  }
}
