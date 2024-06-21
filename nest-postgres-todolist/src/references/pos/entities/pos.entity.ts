import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';
import { Shift } from '../../../documents/shift/entities/shift.entity';
import { Sale } from '../../../documents/sale/entities/sale.entity';
import { PosCheck } from '../../../documents/pos-check/entities/pos-check.entity';

@Entity()
export class Pos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  workspace: string;

  @ManyToOne(() => Shop, (shop) => shop.poses)
  shop: Shop;

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.pos)
  cash_registers: CashRegister[];

  @OneToMany(() => Shift, (shift) => shift.pos)
  shifts: Shift[];

  @OneToMany(() => Sale, (sale) => sale.pos)
  sales: Sale[];

  @OneToMany(() => PosCheck, (posCheck) => posCheck.pos)
  checks: PosCheck[];
}
