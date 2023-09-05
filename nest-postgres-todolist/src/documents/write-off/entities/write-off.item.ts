import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../references/product/entities/product.entity';
import { WriteOff } from './write-off.entity';

@Entity()
export class WriteOffItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WriteOff, (writeOff) => writeOff.items)
  writeOff: WriteOff;

  @ManyToOne(() => Product, (product) => product.writeOffs)
  product: Product;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @Column({ nullable: false, default: 0 })
  price: number;
}
