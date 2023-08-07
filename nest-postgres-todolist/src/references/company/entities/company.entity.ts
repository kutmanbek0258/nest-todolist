import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Salesman } from '../../salesman/entities/salesman.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Depot } from '../../depot/entities/depot.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 500,
  })
  description: string;

  @Column({
    length: 200,
  })
  address: string;

  @Column({
    length: 100,
  })
  phone: string;

  @Column({
    length: 120,
  })
  email: string;

  @OneToMany(() => Salesman, (salesman) => salesman.company)
  salesmen: Salesman[];

  @OneToMany(() => Shop, (shop) => shop.company)
  shops: Shop[];

  @OneToMany(() => Depot, (depot) => depot.company)
  depots: Depot[];

  @OneToMany(() => Supplier, (supplier) => supplier.company)
  suppliers: Supplier[];
}
