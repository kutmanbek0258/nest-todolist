import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDepotDto } from './dto/create-depot.dto';
import { UpdateDepotDto } from './dto/update-depot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Depot } from './entities/depot.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { PersonService } from '../person/person.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class DepotService {
  constructor(
    @InjectRepository(Depot)
    private readonly depotRepository: Repository<Depot>,
    private readonly companyService: CompanyService,
    private readonly personService: PersonService,
  ) {}

  async create(createDepotDto: CreateDepotDto) {
    const company = await this.companyService.findOne(createDepotDto.companyID);
    const manager = await this.personService.findOne(createDepotDto.managerID);
    if (company && manager) {
      const depot = this.depotRepository.create({
        name: createDepotDto.name,
        description: createDepotDto.description,
        address: createDepotDto.address,
        company: company,
        manager: manager,
      });
      return await this.depotRepository.save(depot);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.depotRepository.count();
    const depots = await this.depotRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total: total, depots: depots };
  }

  async findOne(id: number) {
    return await this.depotRepository.query(
      `SELECT depot.id, depot.name, depot.description, depot.address,
             c.id AS companyId, c.name AS companyName,
             p.id AS managerId, p.full_name AS managerName
      FROM depot
      INNER JOIN company c on depot."companyId" = c.id
      INNER JOIN person p on depot."managerId" = p.id
      WHERE depot.id = ${id};`,
    );
  }

  async findOneShort(id: number) {
    return await this.depotRepository.findOneBy({ id: id });
  }

  async update(id: number, updateDepotDto: UpdateDepotDto) {
    const company = await this.companyService.findOne(updateDepotDto.companyID);
    const manager = await this.personService.findOne(updateDepotDto.managerID);
    if (company && manager) {
      return await this.depotRepository.update(
        { id: id },
        {
          name: updateDepotDto.name,
          description: updateDepotDto.description,
          address: updateDepotDto.address,
          company: company,
          manager: manager,
        },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.depotRepository.delete({ id: id });
  }
}
