import { Injectable } from '@nestjs/common';
import { CreatePriceTemplateDto } from './dto/create-price-template.dto';
import { UpdatePriceTemplateDto } from './dto/update-price-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceTemplate } from './entities/price-template.entity';
import { Repository } from 'typeorm';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class PriceTemplateService {
  constructor(
    @InjectRepository(PriceTemplate)
    private readonly priceTemplateRepository: Repository<PriceTemplate>,
  ) {}

  async create(createPriceTemplateDto: CreatePriceTemplateDto) {
    const priceTemplate = this.priceTemplateRepository.create(
      createPriceTemplateDto,
    );
    return await this.priceTemplateRepository.save(priceTemplate);
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.priceTemplateRepository.count();
    const priceTemplates = await this.priceTemplateRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, priceTemplates };
  }

  async findOne(id: number) {
    return await this.priceTemplateRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePriceTemplateDto: UpdatePriceTemplateDto) {
    return await this.priceTemplateRepository.update(
      { id: id },
      updatePriceTemplateDto,
    );
  }

  async remove(id: number) {
    return await this.priceTemplateRepository.delete({ id: id });
  }
}
