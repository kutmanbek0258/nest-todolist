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
import { AuthGuard } from '@nestjs/passport';
import { UserData } from '../../auth/decorators/user.decorator';
import { User } from '../../user/entities/user.entity';
import { ReceiptService } from './receipt.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AddReceiptItemDto } from './dto/add-receipt-item.dto';
import { UpdateReceiptItemDto } from './dto/update-receipt-item.dto';
import { SorterDto } from './dto/sorter.dto';

@Controller('receipt')
@UseGuards(AuthGuard('jwt'))
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@UserData() user: User, @Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptService.create(user, createReceiptDto);
  }

  @Post('/get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.receiptService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(+id, updateReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptService.remove(+id);
  }

  @Post('create-and-fill-price-by-receipt/:id')
  createAndFillPriceDocumentByReceipt(
    @UserData() user: User,
    @Param('id') receiptID: string,
  ) {
    return this.receiptService.createAndFillPriceFromReceipt(+receiptID, user);
  }

  @Post('add-item')
  addItem(@Body() addReceiptItemDto: AddReceiptItemDto) {
    return this.receiptService.addItem(addReceiptItemDto);
  }

  @Post('get-all-items/:id')
  getAllItems(@Param('id') id: string, @Body() sorterDto: SorterDto) {
    console.log(id);
    return this.receiptService.getAllItems(+id, sorterDto);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateReceiptItemDto: UpdateReceiptItemDto,
  ) {
    return this.receiptService.updateItem(+id, updateReceiptItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') id: string) {
    return this.receiptService.deleteItem(+id);
  }
}
