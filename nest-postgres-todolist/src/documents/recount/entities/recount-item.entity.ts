import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recount } from './recount.entity';
import { Product } from '../../../references/product/entities/product.entity';

@Entity()
export class RecountItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recount, (recount) => recount.items)
  recount: Recount;

  @ManyToOne(() => Product, (product) => product.recounts)
  product: Product;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  actual_quantity: number;

  @Column({ type: 'int', default: 0 })
  price: number;
}
