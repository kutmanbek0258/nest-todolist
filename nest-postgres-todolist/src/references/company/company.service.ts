import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.companyRepository.count();
    const companies = await this.companyRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, companies };
  }

  async findOne(id: number) {
    return await this.companyRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update({ id: id }, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepository.delete({ id: id });
  }
}
