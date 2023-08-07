import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { PersonService } from '../person/person.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    private readonly companyService: CompanyService,
    private readonly personService: PersonService,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const company = await this.companyService.findOne(
      createSupplierDto.companyID,
    );
    const person = await this.personService.findOne(createSupplierDto.personID);
    if (company && person) {
      const supplier = this.supplierRepository.create({
        company: company,
        person: person,
      });
      return await this.supplierRepository.save(supplier);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.supplierRepository.count();
    const suppliers = await this.supplierRepository.query(
      `SELECT supplier.id,
               c.id AS companyID, c.name AS companyName,
               p.id AS personID, p.full_name AS fullName
        FROM supplier
        INNER JOIN company c on supplier."companyId" = c.id
        INNER JOIN person p on supplier."personId" = p.id
        ORDER BY supplier.id DESC
        LIMIT ${findAllDto.take} OFFSET ${findAllDto.skip};`,
    );
    return { total, suppliers };
  }

  async findOne(id: number) {
    return await this.supplierRepository.query(
      `SELECT supplier.id, 
               c.id AS companyID, c.name AS companyName,
               p.id AS personID, p.full_name AS fullName
        FROM supplier
        INNER JOIN company c on supplier."companyId" = c.id
        INNER JOIN person p on supplier."personId" = p.id
        WHERE supplier.id = ${id};`,
    );
  }

  async findOneShort(id: number) {
    return await this.supplierRepository.findOneBy({ id: id });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const company = await this.companyService.findOne(
      updateSupplierDto.companyID,
    );
    const person = await this.personService.findOne(updateSupplierDto.personID);
    if (company && person) {
      return await this.supplierRepository.update(
        { id: id },
        { company: company, person: person },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.supplierRepository.delete({ id: id });
  }
}
