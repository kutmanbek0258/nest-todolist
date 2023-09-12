import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../../references/shop/entities/shop.entity';
import { User } from '../../../user/entities/user.entity';
import { PriceItem } from './price-item.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.prices)
  shop: Shop;

  @ManyToOne(() => User, (user) => user.prices)
  created_by: User;

  @OneToMany(() => PriceItem, (priceItem) => priceItem.price)
  items: PriceItem[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
