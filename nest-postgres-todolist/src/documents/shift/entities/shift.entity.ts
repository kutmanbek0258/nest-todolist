import { Pos } from '../../../references/pos/entities/pos.entity';
import { CashRegister } from '../../../references/cash-register/entities/cash-register.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { now } from 'moment';
import { Sale } from '../../sale/entities/sale.entity';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ type: 'timestamptz' })
  end_date: Date;

  @Column({ type: 'int' })
  status: number;

  @ManyToOne(() => Pos, (pos) => pos.shifts)
  pos: Pos;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.shifts)
  cash_register: CashRegister;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => Sale, (sale) => sale.shift)
  sales: Sale[];
}
