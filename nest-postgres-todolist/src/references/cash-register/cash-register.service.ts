import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { UpdateCashRegisterDto } from './dto/update-cash-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { Repository } from 'typeorm';
import { ShopService } from '../shop/shop.service';
import { PosService } from '../pos/pos.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class CashRegisterService {
  constructor(
    @InjectRepository(CashRegister)
    private readonly cashRegisterRepository: Repository<CashRegister>,
    private readonly shopService: ShopService,
    private readonly posService: PosService,
  ) {}

  async create(createCashRegisterDto: CreateCashRegisterDto) {
    const shop = await this.shopService.findOneShort(
      createCashRegisterDto.shopID,
    );
    const pos = await this.posService.findOneShort(createCashRegisterDto.posID);
    if (shop && pos) {
      const cashRegister = this.cashRegisterRepository.create({
        shop: shop,
        pos: pos,
        ofd: createCashRegisterDto.OFD,
        printer: createCashRegisterDto.printer,
      });
      return await this.cashRegisterRepository.save(cashRegister);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.cashRegisterRepository.count();
    const cashRegisters = await this.cashRegisterRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, cashRegisters };
  }

  async findOne(id: number) {
    return await this.cashRegisterRepository.query(
      `SELECT cash_register.id, cash_register.ofd, cash_register.printer,
             s.id AS shopId, s.name AS shopName,
             p.id AS posId, p.name AS posName
      FROM cash_register
      INNER JOIN shop s on cash_register."shopId" = s.id
      INNER JOIN pos p on cash_register."posId" = p.id
      WHERE cash_register.id = ${id};`,
    );
  }

  async update(id: number, updateCashRegisterDto: UpdateCashRegisterDto) {
    const shop = await this.shopService.findOne(updateCashRegisterDto.shopID);
    const pos = await this.posService.findOne(updateCashRegisterDto.posID);
    if (shop && pos) {
      return await this.cashRegisterRepository.update(
        { id: id },
        {
          shop: shop,
          pos: pos,
          ofd: updateCashRegisterDto.OFD,
          printer: updateCashRegisterDto.printer,
        },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.cashRegisterRepository.delete({ id: id });
  }
}
