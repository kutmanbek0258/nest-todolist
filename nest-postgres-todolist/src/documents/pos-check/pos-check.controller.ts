import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PosCheckService } from './pos-check.service';
import { CreatePosCheckDto } from './dto/create-pos-check.dto';
import { UpdatePosCheckDto } from './dto/update-pos-check.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AddCheckItemDto } from './dto/add-check-item.dto';
import { UpdateCheckItemDto } from './dto/update-check-item.dto';

@Controller('pos-check')
export class PosCheckController {
  constructor(private readonly posCheckService: PosCheckService) {}

  @Post()
  create(@Body() createPosCheckDto: CreatePosCheckDto) {
    return this.posCheckService.create(createPosCheckDto);
  }

  @Post('fina-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.posCheckService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posCheckService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePosCheckDto: UpdatePosCheckDto,
  ) {
    return this.posCheckService.update(+id, updatePosCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posCheckService.remove(+id);
  }

  @Post('add-item')
  addItem(@Body() addCheckItemDto: AddCheckItemDto) {
    return this.posCheckService.addItem(addCheckItemDto);
  }

  @Get('get-all-items/:id')
  getAllItems(@Param('id') checkID: number) {
    return this.posCheckService.getAllItems(checkID);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') checkID: number,
    @Body() updateCheckItemDto: UpdateCheckItemDto,
  ) {
    return this.posCheckService.updateItem(checkID, updateCheckItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') itemID: number) {
    return this.posCheckService.deleteItem(itemID);
  }
}
