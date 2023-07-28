import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PosService } from './pos.service';
import { CreatePosDto } from './dto/create-pos.dto';
import { UpdatePosDto } from './dto/update-pos.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post()
  create(@Body() createPosDto: CreatePosDto) {
    return this.posService.create(createPosDto);
  }

  @Post('/get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.posService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosDto: UpdatePosDto) {
    return this.posService.update(+id, updatePosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posService.remove(+id);
  }
}
