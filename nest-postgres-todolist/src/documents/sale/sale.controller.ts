import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AddSaleItemDto } from './dto/add-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Post()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.saleService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }

  @Post('add-item')
  addSaleItem(@Body() addSaleItemDto: AddSaleItemDto) {
    return this.saleService.addItem(addSaleItemDto);
  }

  @Get('get-all-items/:id')
  getAllSaleItems(@Param('id') id: string) {
    return this.saleService.getAllItems(+id);
  }

  @Patch('update-item/:id')
  updateSaleItem(
    @Param('id') id: string,
    @Body() updateSaleItem: UpdateSaleItemDto,
  ) {
    return this.saleService.updateItem(id, updateSaleItem);
  }

  @Delete('delete-item/:id')
  deleteSaleItem(@Param('id') id: string) {
    return this.saleService.deleteItem(+id);
  }
}
