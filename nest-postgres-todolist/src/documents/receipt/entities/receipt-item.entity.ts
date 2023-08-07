import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Receipt } from './receipt.entity';
import { Product } from '../../../references/product/entities/product.entity';

@Entity()
export class ReceiptItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.items)
  receipt: Receipt;

  @ManyToOne(() => Product, (product) => product.receipts)
  product: Product;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @Column({ nullable: false, default: 0 })
  price: number;
}
