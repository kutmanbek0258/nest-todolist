import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ShiftService } from '../shift/shift.service';
import { PosService } from '../../references/pos/pos.service';
import { SalesmanService } from '../../references/salesman/salesman.service';
import { Shift } from '../shift/entities/shift.entity';
import { Pos } from '../../references/pos/entities/pos.entity';
import { Salesman } from '../../references/salesman/entities/salesman.entity';
import { FindAllDto } from './dto/find-all.dto';
import { SaleItem } from './entities/sale-item.entity';
import { AddSaleItemDto } from './dto/add-sale-item.dto';
import { ProductService } from '../../references/product/product.service';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,
    private readonly shiftService: ShiftService,
    private readonly posService: PosService,
    private readonly salesmanService: SalesmanService,
    private readonly productService: ProductService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const shift: Shift = await this.shiftService.findOneShort(
      createSaleDto.shiftID,
    );
    const pos: Pos = await this.posService.findOneShort(createSaleDto.posID);
    const salesman: Salesman = await this.salesmanService.findOneShort(
      createSaleDto.salesmanID,
    );
    const newSale = this.saleRepository.create({
      shift,
      pos,
      salesman,
    });
    return this.saleRepository.save(newSale);
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.saleRepository.query(
      `
    SELECT sale.id, sale."shiftId" AS shift_id, sale."posId" As pos_id, sale."salesmanId" AS salesman_id,
           shift.start_date AS shift_start_date, shift.status AS shift_status,
           pos.name AS pos_name
    FROM sale
    INNER JOIN shift on shift.id = sale."shiftId"
    INNER JOIN pos on pos.id = sale."posId"
    INNER JOIN salesman on salesman.id = sale."salesmanId"
    ORDER BY sale.id
    LIMIT $1 OFFSET $2`,
      [findAllDto.take, findAllDto.skip],
    );
  }

  async findOne(id: number) {
    return await this.saleRepository.query(
      `
    SELECT sale.id, sale."shiftId" AS shift_id, sale."posId" As pos_id, sale."salesmanId" AS salesman_id,
           shift.start_date AS shift_start_date, shift.status AS shift_status,
           pos.name AS pos_name
    FROM sale
    INNER JOIN shift on shift.id = sale."shiftId"
    INNER JOIN pos on pos.id = sale."posId"
    INNER JOIN salesman on salesman.id = sale."salesmanId"
    WHERE sale.id = $1`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.saleRepository.findOneBy({ id: id });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const shift: Shift = await this.shiftService.findOneShort(
      updateSaleDto.shiftID,
    );
    const pos: Pos = await this.posService.findOneShort(updateSaleDto.posID);
    const salesman: Salesman = await this.salesmanService.findOneShort(
      updateSaleDto.salesmanID,
    );
    return await this.saleRepository.update(
      { id: id },
      {
        shift,
        pos,
        salesman,
      },
    );
  }

  async remove(id: number) {
    return await this.saleRepository.delete({ id: id });
  }

  async addItem(addSaleItemDto: AddSaleItemDto) {
    const sale = await this.findOneShort(addSaleItemDto.saleID);
    const product = await this.productService.findOneShort(
      addSaleItemDto.productID,
    );
    const newItem = this.saleItemRepository.create({
      sale,
      product,
      quantity: addSaleItemDto.quantity,
      price: addSaleItemDto.price,
    });
    return await this.saleItemRepository.save(newItem);
  }

  async getAllItems(saleID: number) {
    return await this.saleItemRepository.query(
      `
    SELECT si.id, si."productId" AS product_id, si.quantity, si.price,
           p.name AS product_name
    FROM
    sale_item si
    INNER JOIN product p on p.id = si."productId"
    WHERE si."saleId" = $1;`,
      [saleID],
    );
  }

  async updateItem(itemID, updateSaleItemDto: UpdateSaleItemDto) {
    const product = await this.productService.findOneShort(
      updateSaleItemDto.productID,
    );
    return await this.saleItemRepository.update(
      { id: itemID },
      {
        product,
        quantity: updateSaleItemDto.quantity,
        price: updateSaleItemDto.price,
      },
    );
  }

  async deleteItem(itemID: number) {
    return await this.saleItemRepository.delete({ id: itemID });
  }
}
