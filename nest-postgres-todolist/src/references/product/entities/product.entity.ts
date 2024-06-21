import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductGroup } from '../../product-group/entities/product-group.entity';
import { PriceTemplate } from '../../price-template/entities/price-template.entity';
import { ReceiptItem } from '../../../documents/receipt/entities/receipt-item.entity';
import { WriteOffItem } from '../../../documents/write-off/entities/write-off.item.entity';
import { RecountItem } from '../../../documents/recount/entities/recount-item.entity';
import { PriceItem } from '../../../documents/price/entities/price-item.entity';
import {CheckItem} from "../../../documents/pos-check/entities/check-item.entity";

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

  @Column({
    default: 0,
  })
  quantity: number;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 0,
  })
  cost: number;

  @ManyToOne(() => ProductGroup, (productGroup) => productGroup.products)
  group: ProductGroup;

  @ManyToOne(() => PriceTemplate, (priceTemplate) => priceTemplate.products)
  price_template: PriceTemplate;

  @OneToMany(() => ReceiptItem, (receiptItem) => receiptItem.product)
  receipts: ReceiptItem[];

  @OneToMany(() => WriteOffItem, (writeOffItem) => writeOffItem.product)
  writeOffs: WriteOffItem[];

  @OneToMany(() => RecountItem, (recountItem) => recountItem.product)
  recounts: RecountItem[];

  @OneToMany(() => PriceItem, (priceItem) => priceItem.product)
  prices: PriceItem[];

  @OneToMany(() => CheckItem, (checkItem) => checkItem.product)
  checks: CheckItem[];
}
