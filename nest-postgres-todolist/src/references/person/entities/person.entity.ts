import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Salesman } from '../../salesman/entities/salesman.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Depot } from '../../depot/entities/depot.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 120,
  })
  full_name: string;

  @Column({
    length: 100,
  })
  phone: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 200,
  })
  address: string;

  @OneToMany(() => Salesman, (salesman) => salesman.person)
  salesmen: Salesman[];

  @OneToMany(() => Shop, (shop) => shop.manager)
  shops: Shop[];

  @OneToMany(() => Depot, (depot) => depot.manager)
  depots: Depot[];

  @OneToMany(() => Supplier, (supplier) => supplier.person)
  suppliers: Supplier[];
}
