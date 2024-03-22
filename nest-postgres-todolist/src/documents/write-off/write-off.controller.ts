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
import { WriteOffService } from './write-off.service';
import { CreateWriteOffDto } from './dto/create-write-off.dto';
import { UpdateWriteOffDto } from './dto/update-write-off.dto';
import { User } from '../../user/entities/user.entity';
import { UserData } from '../../auth/decorators/user.decorator';
import { FindAllDto } from './dto/find-all.dto';
import { AddWriteOffItemDto } from './dto/add-write-off-item.dto';
import { UpdateWriteOffItemDto } from './dto/update-write-off-item.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('write-off')
@UseGuards(AuthGuard('jwt'))
export class WriteOffController {
  constructor(private readonly writeOffService: WriteOffService) {}

  @Post()
  create(@UserData() user: User, @Body() createWriteOffDto: CreateWriteOffDto) {
    return this.writeOffService.create(user, createWriteOffDto);
  }

  @Post('get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.writeOffService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writeOffService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWriteOffDto: UpdateWriteOffDto,
  ) {
    return this.writeOffService.update(+id, updateWriteOffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writeOffService.remove(+id);
  }

  @Post('add-item')
  addItem(@Body() addWriteOffItemDto: AddWriteOffItemDto) {
    return this.writeOffService.addItem(addWriteOffItemDto);
  }

  @Get('get-all-items/:id')
  getAllItems(@Param('id') itemId: number) {
    return this.writeOffService.getAllItems(itemId);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') itemId: number,
    @Body() updateWriteOffItemDto: UpdateWriteOffItemDto,
  ) {
    return this.writeOffService.updateItem(itemId, updateWriteOffItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') itemId: number) {
    return this.writeOffService.deleteItem(itemId);
  }
}
