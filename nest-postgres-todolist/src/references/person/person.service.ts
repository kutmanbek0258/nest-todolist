import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(person);
  }

  async findAll(findAllDto: FindAllDto) {
    const total: number = await this.personRepository.count();
    const persons: Person[] = await this.personRepository.find({
      take: findAllDto.take,
      skip: findAllDto.skip,
      order: { id: 'DESC' },
    });
    return { total, persons };
  }

  async findOne(id: number) {
    return await this.personRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.personRepository.update({ id: id }, updatePersonDto);
  }

  async remove(id: number) {
    return await this.personRepository.delete({ id: id });
  }
}
