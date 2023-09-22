import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';

@Entity()
export class Pos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  workspace: string;

  @ManyToOne(() => Shop, (shop) => shop.poses)
  shop: Shop;

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.pos)
  cash_registers: CashRegister[];
}
