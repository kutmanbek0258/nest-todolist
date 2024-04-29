import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shift } from '../../shift/entities/shift.entity';
import { Pos } from '../../../references/pos/entities/pos.entity';
import { Salesman } from '../../../references/salesman/entities/salesman.entity';
import { SaleItem } from './sale-item.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift, (shift) => shift.sales)
  shift: Shift;

  @ManyToOne(() => Pos, (pos) => pos.sales)
  pos: Pos;

  @ManyToOne(() => Salesman, (salesman) => salesman.sales)
  salesman: Salesman;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  items: SaleItem[];
}
