import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class PriceTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  formula: number;

  @OneToMany(() => Product, (product) => product.price_template)
  products: Product[];
}
