import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WriteOffService } from './write-off.service';
import { CreateWriteOffDto } from './dto/create-write-off.dto';
import { UpdateWriteOffDto } from './dto/update-write-off.dto';
import { User } from '../../user/entities/user.entity';
import { UserData } from '../../auth/decorators/user.decorator';
import { FindAllDto } from './dto/find-all.dto';

@Controller('write-off')
export class WriteOffController {
  constructor(private readonly writeOffService: WriteOffService) {}

  @Post()
  create(@UserData() user: User, @Body() createWriteOffDto: CreateWriteOffDto) {
    return this.writeOffService.create(user, createWriteOffDto);
  }

  @Get()
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
}
