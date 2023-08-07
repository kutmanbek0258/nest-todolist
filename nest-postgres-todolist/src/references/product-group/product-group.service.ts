import { Injectable } from '@nestjs/common';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGroup } from './entities/product-group.entity';
import { Repository } from 'typeorm';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private readonly productGroupRepository: Repository<ProductGroup>,
  ) {}

  async create(createProductGroupDto: CreateProductGroupDto) {
    const productGroup = this.productGroupRepository.create(
      createProductGroupDto,
    );
    return await this.productGroupRepository.save(productGroup);
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.productGroupRepository.count();
    const productGroups = await this.productGroupRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, productGroups };
  }

  findOne(id: number) {
    return this.productGroupRepository.findOneBy({ id: id });
  }

  update(id: number, updateProductGroupDto: UpdateProductGroupDto) {
    return this.productGroupRepository.update(
      { id: id },
      updateProductGroupDto,
    );
  }

  remove(id: number) {
    return this.productGroupRepository.delete({ id: id });
  }
}
