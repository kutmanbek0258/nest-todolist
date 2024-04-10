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
import { RecountService } from './recount.service';
import { CreateRecountDto } from './dto/create-recount.dto';
import { UpdateRecountDto } from './dto/update-recount.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AddRecountItemDto } from './dto/add-recount-item.dto';
import { UpdateRecountItemDto } from './dto/update-recount-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserData } from '../../auth/decorators/user.decorator';
import { User } from '../../user/entities/user.entity';

@Controller('recount')
@UseGuards(AuthGuard('jwt'))
export class RecountController {
  constructor(private readonly recountService: RecountService) {}

  @Post()
  create(@UserData() user: User, @Body() createRecountDto: CreateRecountDto) {
    return this.recountService.create(user, createRecountDto);
  }

  @Post('get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.recountService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecountDto: UpdateRecountDto) {
    return this.recountService.update(+id, updateRecountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recountService.remove(+id);
  }

  @Post('add-item')
  addItem(@Body() addItemDto: AddRecountItemDto) {
    return this.recountService.addItem(addItemDto);
  }

  @Post('fill-items-by-accounting-qty/:id')
  fillItemsByAccountingQuantity(@Param('id') recountId: string) {
    return this.recountService.fillItemsByAccountingQuantity(+recountId);
  }

  @Post('fill-items-actual-qty-by-accounting-qty/:id')
  fillItemsActualQuantityByAccountingQuantity(@Param('id') recountId: string) {
    return this.recountService.fillItemsActualQuantityByAccountingQuantity(
      +recountId,
    );
  }

  @Get('get-all-items/:id')
  getAllItems(@Param('id') recountId: number) {
    return this.recountService.getAllItems(recountId);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') itemId: number,
    @Body() updateRecountItemDto: UpdateRecountItemDto,
  ) {
    return this.recountService.updateItem(itemId, updateRecountItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') itemId: number) {
    return this.recountService.deleteItem(itemId);
  }
}
