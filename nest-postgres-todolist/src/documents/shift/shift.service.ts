import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { PosService } from '../../references/pos/pos.service';
import { CashRegisterService } from '../../references/cash-register/cash-register.service';
import { Pos } from '../../references/pos/entities/pos.entity';
import { CashRegister } from '../../references/cash-register/entities/cash-register.entity';
import { FindAllDto } from './dto/find-all.dto';
import { OpenShiftDto } from './dto/open-shift.dto';
import { now } from 'moment';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    private readonly posService: PosService,
    private readonly cashRegisterService: CashRegisterService,
  ) {}

  async open(openCloseShiftDto: OpenShiftDto) {
    const pos: Pos = await this.posService.findOneShort(
      openCloseShiftDto.posId,
    );
    const cashRegister: CashRegister =
      await this.cashRegisterService.findOneShort(
        openCloseShiftDto.cashRegisterId,
      );
    if (pos && cashRegister) {
      const shift: Shift = this.shiftRepository.create({
        start_date: openCloseShiftDto.startDate,
        end_date: openCloseShiftDto.endDate,
        status: ShiftStatus.Open,
        pos,
        cash_register: cashRegister,
      });
      return await this.shiftRepository.save(shift);
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async close(id: number) {
    return await this.shiftRepository.update(
      { id: id },
      {
        end_date: now(),
        status: ShiftStatus.Close,
      },
    );
  }

  async findAll(findAllDto: FindAllDto) {
    const total: number = await this.shiftRepository.count();
    const shifts: Shift[] = await this.shiftRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total: total, shifts: shifts };
  }

  async findOne(id: number) {
    return await this.shiftRepository.query(
      `
      SELECT start_date, end_date, status,
             p.id AS posid, p.name AS posname,
             cr.id AS cashregisterid
      FROM shift
      INNER JOIN cash_register cr on cr.id = shift."cashRegisterId"
      INNER JOIN pos p on p.id = shift."posId"
      WHERE shift.id = $1;`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.shiftRepository.findOneBy({ id: id });
  }

  async update(id: number, updateShiftDto: UpdateShiftDto) {
    const cashRegister: CashRegister =
      await this.cashRegisterService.findOneShort(
        updateShiftDto.cashRegisterId,
      );
    const pos: Pos = await this.posService.findOneShort(updateShiftDto.posId);
    if (cashRegister && pos) {
      return await this.shiftRepository.update(
        { id: id },
        {
          start_date: updateShiftDto.startDate,
          end_date: updateShiftDto.endDate,
          status: updateShiftDto.status,
          cash_register: cashRegister,
          pos,
        },
      );
    } else {
      throw new ForbiddenException({ message: 'References not found!' });
    }
  }

  async remove(id: number) {
    return await this.shiftRepository.delete({ id: id });
  }
}
