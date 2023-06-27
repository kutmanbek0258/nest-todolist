import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { UpdateCashRegisterDto } from './dto/update-cash-register.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('cash-register')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Post()
  create(@Body() createCashRegisterDto: CreateCashRegisterDto) {
    return this.cashRegisterService.create(createCashRegisterDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.cashRegisterService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashRegisterDto: UpdateCashRegisterDto,
  ) {
    return this.cashRegisterService.update(+id, updateCashRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashRegisterService.remove(+id);
  }
}
