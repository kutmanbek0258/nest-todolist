import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UserData } from '../../auth/decorators/user.decorator';
import { User } from '../../user/entities/user.entity';
import { FindAllDto } from './dto/find-all.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddPriceItemDto } from './dto/add-price-item.dto';
import { UpdatePriceItemDto } from './dto/update-price-item.dto';

@Controller('price')
@UseGuards(AuthGuard('jwt'))
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  create(@UserData() user: User, @Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(user, createPriceDto);
  }

  @Post('get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.priceService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }

  @Post('add-item')
  addItem(@Body() addPriceItemDto: AddPriceItemDto) {
    return this.priceService.addItem(addPriceItemDto);
  }

  @Get('get-all-items/:id')
  getAllItems(@Param('id') priceId: number) {
    return this.priceService.getAllItems(priceId);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') itemId: number,
    @Body() updatePriceItemDto: UpdatePriceItemDto,
  ) {
    return this.priceService.updateItem(itemId, updatePriceItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') itemId: number) {
    return this.priceService.deleteItem(itemId);
  }
}
