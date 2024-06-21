import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosCheckService } from './pos-check.service';
import { CreatePosCheckDto } from './dto/create-pos-check.dto';
import { UpdatePosCheckDto } from './dto/update-pos-check.dto';

@Controller('pos-check')
export class PosCheckController {
  constructor(private readonly posCheckService: PosCheckService) {}

  @Post()
  create(@Body() createPosCheckDto: CreatePosCheckDto) {
    return this.posCheckService.create(createPosCheckDto);
  }

  @Get()
  findAll() {
    return this.posCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posCheckService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosCheckDto: UpdatePosCheckDto) {
    return this.posCheckService.update(+id, updatePosCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posCheckService.remove(+id);
  }
}
