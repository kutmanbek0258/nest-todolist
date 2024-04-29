import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salesman } from './entities/salesman.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { PersonService } from '../person/person.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class SalesmanService {
  constructor(
    @InjectRepository(Salesman)
    private readonly salesmanRepository: Repository<Salesman>,
    private readonly companyService: CompanyService,
    private readonly personService: PersonService,
  ) {}

  async create(createSalesmanDto: CreateSalesmanDto) {
    const company = await this.companyService.findOne(
      createSalesmanDto.companyID,
    );
    const person = await this.personService.findOne(createSalesmanDto.personID);
    if (company && person) {
      const salesman = this.salesmanRepository.create({
        company: company,
        person: person,
      });
      return await this.salesmanRepository.save(salesman);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.salesmanRepository.count();
    const salesmen = await this.salesmanRepository.query(
      `SELECT salesman.id,
               c.id AS companyID, c.name AS companyName,
               p.id AS personID, p.full_name AS fullName
        FROM salesman
        INNER JOIN company c on salesman."companyId" = c.id
        INNER JOIN person p on salesman."personId" = p.id
        ORDER BY salesman.id DESC
        LIMIT ${findAllDto.take} OFFSET ${findAllDto.skip};`,
    );
    return { total, salesmen };
  }

  async findOne(id: number) {
    return await this.salesmanRepository.query(
      `SELECT salesman.id,
               c.id AS companyID, c.name AS companyName,
               p.id AS personID, p.full_name AS fullName
        FROM salesman
        INNER JOIN company c on salesman."companyId" = c.id
        INNER JOIN person p on salesman."personId" = p.id
        WHERE salesman.id = ${id};`,
    );
  }

  async findOneShort(id: number) {
    return await this.salesmanRepository.findOneBy({ id: id });
  }

  async update(id: number, updateSalesmanDto: UpdateSalesmanDto) {
    const company = await this.companyService.findOne(
      updateSalesmanDto.companyID,
    );
    const person = await this.personService.findOne(updateSalesmanDto.personID);
    if (company && person) {
      return await this.salesmanRepository.update(
        { id: id },
        { company: company, person: person },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.salesmanRepository.delete({ id: id });
  }
}
