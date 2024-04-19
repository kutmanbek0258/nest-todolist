import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../../references/shop/entities/shop.entity';
import { Depot } from '../../../references/depot/entities/depot.entity';
import { User } from '../../../user/entities/user.entity';
import { WriteOffItem } from './write-off.item.entity';

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
  updated_at: Date;

  @OneToMany(() => WriteOffItem, (writeOffItem) => writeOffItem.writeOff)
  items: WriteOffItem[];
}
