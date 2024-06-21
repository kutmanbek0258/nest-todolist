import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../references/product/entities/product.entity';
import { PosCheck } from './pos-check.entity';

@Entity()
export class CheckItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PosCheck, (posCheck) => posCheck.items)
  check: PosCheck;

  @ManyToOne(() => Product, (product) => product.checks)
  product: Product;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;
}
