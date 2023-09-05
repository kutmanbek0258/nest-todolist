import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Person } from '../../person/entities/person.entity';
import { Pos } from '../../pos/entities/pos.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';
import { Depot } from '../../depot/entities/depot.entity';
import { Receipt } from '../../../documents/receipt/entities/receipt.entity';
import { WriteOff } from '../../../documents/write-off/entities/write-off.entity';
import { Recount } from '../../../documents/recount/entities/recount.entity';
import { Price } from '../../../documents/price/entities/price.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 120,
  })
  name: string;

  @Column({
    length: 500,
  })
  description: string;

  @Column({
    length: 120,
  })
  address: string;

  @ManyToOne(() => Company, (company) => company.shops)
  company: Company;

  @ManyToOne(() => Person, (person) => person.shops)
  manager: Person;

  @ManyToOne(() => Depot, (depot) => depot.shops)
  depot: Depot;

  @OneToMany(() => Pos, (pos) => pos.shop)
  poses: Pos[];

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.shop)
  cashRegisters: CashRegister[];

  @OneToMany(() => Receipt, (receipt) => receipt.shop)
  receipts: Receipt[];

  @OneToMany(() => WriteOff, (writeOff) => writeOff.shop)
  writeOffs: WriteOff[];

  @OneToMany(() => Recount, (recount) => recount.shop)
  recounts: Recount[];

  @OneToMany(() => Price, (price) => price.shop)
  prices: Price[];
}
