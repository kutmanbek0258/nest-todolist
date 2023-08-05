import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Company } from '../../company/entities/company.entity';
import { Receipt } from '../../../documents/receipt/entities/receipt.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.suppliers)
  person: Person;

  @ManyToOne(() => Company, (company) => company.suppliers)
  company: Company;

  @OneToMany(() => Receipt, (receipt) => receipt.supplier)
  contracts: Receipt[];
}
