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
import { RecountItem } from './recount-item.entity';

@Entity()
export class Recount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.recounts)
  shop: Shop;

  @ManyToOne(() => Depot, (depot) => depot.recounts)
  depot: Depot;

  @Column({ type: 'int', nullable: false })
  status: number;
  /*
   * 0 open
   * 1 on process
   * 2 closed
   * */

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  start_date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  end_date: Date;

  @ManyToOne(() => User, (user) => user.recounts)
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

  @OneToMany(() => RecountItem, (recountItem) => recountItem.recount)
  items: RecountItem[];
}
