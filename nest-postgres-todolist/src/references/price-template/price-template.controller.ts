import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PriceTemplateService } from './price-template.service';
import { CreatePriceTemplateDto } from './dto/create-price-template.dto';
import { UpdatePriceTemplateDto } from './dto/update-price-template.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('price-template')
export class PriceTemplateController {
  constructor(private readonly priceTemplateService: PriceTemplateService) {}

  @Post()
  create(@Body() createPriceTemplateDto: CreatePriceTemplateDto) {
    return this.priceTemplateService.create(createPriceTemplateDto);
  }

  @Post('/get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.priceTemplateService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriceTemplateDto: UpdatePriceTemplateDto,
  ) {
    return this.priceTemplateService.update(+id, updatePriceTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceTemplateService.remove(+id);
  }
}
