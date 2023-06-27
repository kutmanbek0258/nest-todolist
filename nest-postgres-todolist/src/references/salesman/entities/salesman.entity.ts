import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Salesman {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.salesmen)
  person: Person;

  @ManyToOne(() => Company, (company) => company.salesmen)
  company: Company;
}
