import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePosCheckDto } from './dto/create-pos-check.dto';
import { UpdatePosCheckDto } from './dto/update-pos-check.dto';
import { Repository } from 'typeorm';
import { PosCheck } from './entities/pos-check.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckItem } from './entities/check-item.entity';
import { ProductService } from '../../references/product/product.service';
import { PosService } from '../../references/pos/pos.service';
import { ShiftService } from '../shift/shift.service';
import { CashRegisterService } from '../../references/cash-register/cash-register.service';
import { Shift } from '../shift/entities/shift.entity';
import { Pos } from '../../references/pos/entities/pos.entity';
import { CashRegister } from '../../references/cash-register/entities/cash-register.entity';
import { Salesman } from '../../references/salesman/entities/salesman.entity';
import { SalesmanService } from '../../references/salesman/salesman.service';
import { FindAllDto } from './dto/find-all.dto';
import { AddCheckItemDto } from './dto/add-check-item.dto';
import { UpdateCheckItemDto } from './dto/update-check-item.dto';

@Injectable()
export class PosCheckService {
  constructor(
    @InjectRepository(PosCheck)
    private readonly posCheckRepository: Repository<PosCheck>,
    @InjectRepository(CheckItem)
    private readonly checkItemRepository: Repository<CheckItem>,
    private readonly productService: ProductService,
    private readonly posService: PosService,
    private readonly shiftService: ShiftService,
    private readonly cashRegisterService: CashRegisterService,
    private readonly salesmanService: SalesmanService,
  ) {}

  async create(createPosCheckDto: CreatePosCheckDto) {
    const shift: Shift = await this.shiftService.findOneShort(
      createPosCheckDto.shiftID,
    );
    const pos: Pos = await this.posService.findOneShort(
      createPosCheckDto.posID,
    );
    const cashRegister: CashRegister =
      await this.cashRegisterService.findOneShort(
        createPosCheckDto.cashRegisterID,
      );
    const salesman: Salesman = await this.salesmanService.findOneShort(
      createPosCheckDto.salesmanID,
    );

    if (shift && pos && cashRegister && salesman) {
      const newPosCheck = this.posCheckRepository.create({
        shift,
        pos,
        cashRegister,
        salesman,
      });
      return await this.posCheckRepository.save(newPosCheck);
    } else {
      throw new ForbiddenException({ message: 'references not found!' });
    }
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.posCheckRepository.query(
      `SELECT
            pos_check.id, pos_check."isHold", pos_check."isArchive", pos_check.created_at, pos_check.updated_at,
              (SELECT COUNT(quantity)
                FROM check_item
                WHERE check_item.id = pos_check.id)
              AS sum
        FROM pos_check
        LIMIT $1 OFFSET $2`,
      [findAllDto.take, findAllDto.skip],
    );
  }

  async findOne(id: number) {
    return await this.posCheckRepository.query(
      `SELECT count(id)
      FROM product;
      
      SELECT
          pos_check.id, "isHold", "isArchive", created_at, updated_at, "shiftId", "posId", "cashRegisterId", "salesmanId",
          full_name as salesman
      FROM pos_check
      INNER JOIN salesman s on s.id = pos_check."salesmanId"
      INNER JOIN person p on p.id = s."personId"
      WHERE pos_check.id = $1`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.posCheckRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePosCheckDto: UpdatePosCheckDto) {
    return await this.posCheckRepository.update({ id: id }, updatePosCheckDto);
  }

  async remove(id: number) {
    return await this.posCheckRepository.delete({ id: id });
  }

  async addItem(addCheckItemDto: AddCheckItemDto) {
    const posCheck = await this.findOneShort(addCheckItemDto.checkID);
    const product = await this.productService.findOneShort(
      addCheckItemDto.productID,
    );
    if (posCheck && product) {
      const newItem = this.checkItemRepository.create({
        product,
        check: posCheck,
        quantity: addCheckItemDto.quantity,
        price: addCheckItemDto.price,
      });
      return await this.checkItemRepository.save(newItem);
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async getAllItems(checkID: number) {
    return await this.checkItemRepository.query(
      `SELECT
          check_item.id, check_item.price, check_item.quantity, "checkId", "productId",
          p.name AS productname, p.description as productdescription
      FROM check_item
      INNER JOIN product p on p.id = check_item."productId"
      WHERE check_item."checkId" = $1`,
      [checkID],
    );
  }

  async updateItem(itemID: number, updateCheItemDto: UpdateCheckItemDto) {
    return await this.checkItemRepository.update(
      { id: itemID },
      updateCheItemDto,
    );
  }

  async deleteItem(itemID: number) {
    return await this.checkItemRepository.delete({ id: itemID });
  }
}
