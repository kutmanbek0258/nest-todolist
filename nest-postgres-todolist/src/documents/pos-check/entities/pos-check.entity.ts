import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shift } from '../../shift/entities/shift.entity';
import { Pos } from '../../../references/pos/entities/pos.entity';
import { CashRegister } from '../../../references/cash-register/entities/cash-register.entity';
import { CheckItem } from './check-item.entity';
import { Salesman } from '../../../references/salesman/entities/salesman.entity';

@Entity()
export class PosCheck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift, (shift) => shift.checks)
  shift: Shift;

  @ManyToOne(() => Pos, (pos) => pos.checks)
  pos: Pos;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.checks)
  cashRegister: CashRegister;

  @ManyToOne(() => Salesman, (salesman) => salesman.checks)
  salesman: Salesman;

  @Column({ type: 'boolean', default: false })
  isHold: boolean;

  @Column({ type: 'boolean', default: false })
  isArchive: boolean;

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
  public updated_at: Date;

  @OneToMany(() => CheckItem, (checkItem) => checkItem.check)
  items: CheckItem[];
}
