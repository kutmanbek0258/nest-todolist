import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Pos } from '../../pos/entities/pos.entity';

@Entity()
export class CashRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.cashRegisters)
  shop: Shop;

  @ManyToOne(() => Pos, (pos) => pos.cash_registers)
  pos: Pos;

  @Column({ length: 200 })
  ofd: string;

  @Column({ length: 200 })
  printer: string;
}
