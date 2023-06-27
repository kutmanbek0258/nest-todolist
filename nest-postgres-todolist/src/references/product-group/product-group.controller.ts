import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('product-group')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Post()
  create(@Body() createProductGroupDto: CreateProductGroupDto) {
    return this.productGroupService.create(createProductGroupDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.productGroupService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductGroupDto: UpdateProductGroupDto,
  ) {
    return this.productGroupService.update(+id, updateProductGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productGroupService.remove(+id);
  }
}
