import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Pos } from '../../pos/entities/pos.entity';
import { Shift } from '../../../documents/shift/entities/shift.entity';

@Entity()
export class CashRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.cashRegisters)
  shop: Shop;

  @ManyToOne(() => Pos, (pos) => pos.cash_registers)
  pos: Pos;

  @Column({ length: 200 })
  ofd: string;

  @Column({ length: 200 })
  printer: string;

  @OneToMany(() => Shift, (shift) => shift.cash_register)
  shifts: Shift[];
}
