import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Company } from '../../company/entities/company.entity';
import { Sale } from '../../../documents/sale/entities/sale.entity';
import { PosCheck } from '../../../documents/pos-check/entities/pos-check.entity';

@Entity()
export class Salesman {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.salesmen)
  person: Person;

  @ManyToOne(() => Company, (company) => company.salesmen)
  company: Company;

  @OneToMany(() => Sale, (sale) => sale.salesman)
  sales: Sale[];

  @OneToMany(() => PosCheck, (posCheck) => posCheck.salesman)
  checks: PosCheck[];
}
