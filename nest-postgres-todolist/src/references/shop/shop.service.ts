import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { PersonService } from '../person/person.service';
import { DepotService } from '../depot/depot.service';
import { Company } from '../company/entities/company.entity';
import { Person } from '../person/entities/person.entity';
import { Depot } from '../depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private readonly companyService: CompanyService,
    private readonly personService: PersonService,
    private readonly depotService: DepotService,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const company = await this.companyService.findOne(createShopDto.companyID);
    const manager = await this.personService.findOne(createShopDto.managerID);
    const depot = await this.depotService.findOneShort(createShopDto.depotID);
    if (company && manager && depot) {
      const shop = this.shopRepository.create({
        name: createShopDto.name,
        description: createShopDto.description,
        address: createShopDto.address,
        company: company,
        manager: manager,
        depot: depot,
      });
      return await this.shopRepository.save(shop);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.shopRepository.count();
    const shops = await this.shopRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, shops };
  }

  async findOne(id: number) {
    return await this.shopRepository.query(
      `SELECT shop.name, shop.description, shop.address,
               c.id AS companyID, c.name AS companyName,
               p.id AS managerID, p.full_name AS managerName,
               d.id AS depotID, d.name AS depotName
        FROM shop
        INNER JOIN company c on shop."companyId" = c.id
        INNER JOIN person p on shop."managerId" = p.id
        INNER JOIN depot d on shop."depotId" = d.id
        WHERE shop.id = ${id};`,
    );
  }
  async findOneShort(id: number) {
    return await this.shopRepository.findOneBy({ id: id });
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop: Shop = await this.shopRepository.findOneBy({ id: id });
    shop.name = updateShopDto.name ? updateShopDto.name : shop.name;
    shop.description = updateShopDto.description
      ? updateShopDto.description
      : shop.description;
    shop.address = updateShopDto.address ? updateShopDto.address : shop.address;
    const company: Company = await this.companyService.findOne(
      updateShopDto.companyID,
    );
    const manager: Person = await this.personService.findOne(
      updateShopDto.managerID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      updateShopDto.depotID,
    );
    shop.company = company ? company : shop.company;
    shop.manager = manager ? manager : shop.manager;
    shop.depot = depot ? depot : shop.depot;
    console.log(shop);
    if (company && manager && depot) {
      return await this.shopRepository.update({ id: id }, shop);
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.shopRepository.delete({ id: id });
  }
}
