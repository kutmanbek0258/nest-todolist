import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductGroup } from '../../product-group/entities/product-group.entity';
import { PriceTemplate } from '../../price-template/entities/price-template.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column()
  barcode: string;

  @ManyToOne(() => ProductGroup, (productGroup) => productGroup.products)
  group: ProductGroup;

  @ManyToOne(() => PriceTemplate, (priceTemplate) => priceTemplate.products)
  price_template: PriceTemplate;
}
