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

  async findAll() {
    return `This action returns all posCheck`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} posCheck`;
  }

  async update(id: number, updatePosCheckDto: UpdatePosCheckDto) {
    return `This action updates a #${id} posCheck`;
  }

  async remove(id: number) {
    return `This action removes a #${id} posCheck`;
  }
}
