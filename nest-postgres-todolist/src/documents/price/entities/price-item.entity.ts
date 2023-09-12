import { Price } from './price.entity';
import { Product } from '../../../references/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PriceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Price, (price) => price.items)
  price: Price;

  @ManyToOne(() => Product, (product) => product.prices)
  product: Product;

  @Column({ type: 'int' })
  retail_price: number;
}
