import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Supplier } from '../../../references/supplier/entities/supplier.entity';
import { Depot } from '../../../references/depot/entities/depot.entity';
import { Shop } from '../../../references/shop/entities/shop.entity';
import { User } from '../../../user/entities/user.entity';
import { ReceiptItem } from './receipt-item.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.contracts)
  supplier: Supplier;

  @ManyToOne(() => Shop, (shop) => shop.receipts)
  shop: Shop;

  @ManyToOne(() => Depot, (depot) => depot.receipts)
  depot: Depot;

  @ManyToOne(() => User, (user) => user.receipts)
  created_by: User;

  @Column({
    nullable: true,
  })
  based_on: number;

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

  @OneToMany(() => ReceiptItem, (receiptItem) => receiptItem.receipt)
  items: ReceiptItem[];
}
