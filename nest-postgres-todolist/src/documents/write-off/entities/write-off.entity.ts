import {
  CreateDateColumn, Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../../references/shop/entities/shop.entity';
import { Depot } from '../../../references/depot/entities/depot.entity';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class WriteOff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.writeOffs)
  shop: Shop;

  @ManyToOne(() => Depot, (depot) => depot.writeOffs)
  depot: Depot;

  @ManyToOne(() => User, (user) => user.writeOffs)
  created_by: User;

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
  updated_at: Date;
}
