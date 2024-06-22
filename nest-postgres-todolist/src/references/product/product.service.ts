import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { ProductGroupService } from '../product-group/product-group.service';
import { ProductGroup } from '../product-group/entities/product-group.entity';
import { PriceTemplate } from '../price-template/entities/price-template.entity';
import { PriceTemplateService } from '../price-template/price-template.service';
import { FindAllDto } from './dto/find-all.dto';
import * as csv from 'csv-parse';
import ProductSearchService from './product.search.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productGroupService: ProductGroupService,
    private readonly priceTemplateService: PriceTemplateService,
    private readonly productSearchService: ProductSearchService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productGroup: ProductGroup = await this.productGroupService.findOne(
      createProductDto.groupID,
    );
    const priceTemplate: PriceTemplate =
      await this.priceTemplateService.findOne(
        createProductDto.price_templateID,
      );
    if (productGroup && priceTemplate) {
      const product = this.productRepository.create({
        name: createProductDto.name,
        description: createProductDto.description,
        barcode: createProductDto.barcode,
        group: productGroup,
        price_template: priceTemplate,
      });
      const newProduct = await this.productRepository.save(product);
      await this.productSearchService.indexProduct(newProduct);
      return newProduct;
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    if (findAllDto.query) {
      const { results, count } = await this.productSearchService.search(
        findAllDto.query,
        findAllDto.skip,
        findAllDto.take,
      );
      const ids = results.map((result) => result.id);
      if (!ids.length) {
        console.log('Not found!');
        return {
          products: [],
          total: count,
        };
      }
      console.log('found!');
      const products = await Promise.all(
        ids.map(
          async (id): Promise<Product> =>
            await this.productRepository.findOneBy({ id: id }),
        ),
      );
      return { total: count, products };
    } else {
      const total = await this.productRepository.count();
      const products = await this.productRepository.find({
        take: findAllDto.take,
        skip: findAllDto.skip,
        order: { id: 'DESC' },
      });
      return { total, products };
    }
  }

  async findOne(id: number) {
    return await this.productRepository.query(
      `SELECT product.name, product.description, product.barcode,
            pg.id AS pgID, pg.name AS pgName,
            pt.id AS ptID, pt.name AS ptName
        FROM product
        INNER JOIN product_group pg ON product."groupId" = pg."id"
        INNER JOIN price_template pt on product."priceTemplateId" = pt.id
        WHERE product.id = ${id};`,
    );
  }

  async findOneShort(id: number) {
    return await this.productRepository.findOneBy({ id: id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product: Product = await this.productRepository.findOneBy({ id: id });
    product.name = updateProductDto.name ? updateProductDto.name : product.name;
    product.description = updateProductDto.description
      ? updateProductDto.description
      : product.description;
    product.barcode = updateProductDto.barcode
      ? updateProductDto.barcode
      : product.barcode;
    const productGroup: ProductGroup = await this.productGroupService.findOne(
      updateProductDto.groupID,
    );
    const priceTemplate: PriceTemplate =
      await this.priceTemplateService.findOne(
        updateProductDto.price_templateID,
      );
    if (productGroup && priceTemplate) {
      product.group = productGroup;
      product.price_template = priceTemplate;
      const updatedProduct = await this.productRepository.update(
        { id: id },
        product,
      );
      await this.productSearchService.updateProduct(product);
      return updatedProduct;
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    const removedProduct = await this.productRepository.delete({ id: id });
    await this.productSearchService.removeProduct(id);
    return removedProduct;
  }

  async uploadProductsCsv(products: CreateProductDto[]) {
    return await Promise.all(
      products.map(
        async (product): Promise<Product> => await this.create(product),
      ),
    );
  }

  async parseAndValidateCsvData(file): Promise<CreateProductDto[]> {
    const csvContent = file.buffer;
    const parsedData: CreateProductDto[] = await new Promise(
      (resolve, reject) => {
        csv.parse(
          csvContent,
          {
            columns: true,
            relax_quotes: true,
            skip_empty_lines: true,
            cast: true,
          },
          (err, records) => {
            if (err) {
              reject(err);
              throw new ForbiddenException({ message: 'Unable to parse file' });
            }
            resolve(records);
          },
        );
      },
    );
    if (!parsedData.length) {
      throw new ForbiddenException({ message: 'Empty csv data' });
    }
    //validate All Rows
    for await (const [index, rowData] of parsedData.entries()) {
      const validationErrors = await this.validateFileRow(rowData);
      if (validationErrors.length) {
        console.log(validationErrors);
        throw new ForbiddenException({
          message: `File Rows Validation Failed at row: ${
            index + 1
          }, ${validationErrors}`,
        });
      }
    }
    return parsedData;
  }

  async validateFileRow(rowData) {
    const errors: string[] = [];
    const csvDto = plainToInstance(CreateProductDto, rowData);
    const validationErrors = await validate(csvDto);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        const { property, constraints } = error;
        const errorMessage = `${property}: ${Object.values(constraints).join(
          ', ',
        )}`;
        errors.push(errorMessage);
      });
    }
    return errors;
  }
}
