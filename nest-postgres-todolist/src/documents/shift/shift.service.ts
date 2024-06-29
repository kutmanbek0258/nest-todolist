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

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    private readonly posService: PosService,
    private readonly cashRegisterService: CashRegisterService,
  ) {}

  async open(openCloseShiftDto: OpenShiftDto) {
    return await this.shiftRepository.query(
      `
      SELECT * FROM open_shift($1, $2);`,
      [openCloseShiftDto.posId, openCloseShiftDto.cashRegisterId],
    );
  }

  async close(id: number, salesmanId: number) {
    return await this.shiftRepository.query(
      `
    SELECT * FROM close_shift($1, $2);`,
      [id, salesmanId],
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

  async findCurrentShift(posID: number) {
    return await this.shiftRepository.query(
      `
      SELECT start_date, end_date, status,
             p.id AS posid, p.name AS posname,
             cr.id AS cashregisterid
      FROM shift
      INNER JOIN cash_register cr on cr.id = shift."cashRegisterId"
      INNER JOIN pos p on p.id = shift."posId"
      WHERE shift."posId" = $1 AND shift.status = $2 AND shift.start_date <= NOW() - '1 day'::INTERVAL`,
      [posID, ShiftStatus.Open],
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
