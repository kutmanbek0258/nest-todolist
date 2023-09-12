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
}
