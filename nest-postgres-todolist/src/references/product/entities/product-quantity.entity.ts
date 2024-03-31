import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../references/product/entities/product.entity';

@Entity()
export class ProductQuantity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @OneToOne(() => Product, (product) => product.quantity)
  product: Product;
}
