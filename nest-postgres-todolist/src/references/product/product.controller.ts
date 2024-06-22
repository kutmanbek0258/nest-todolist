import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  ForbiddenException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('/get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.productService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('upload-products-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { files: 1, fileSize: 2024 * 2048 * 15 }, // 1 MB you can adjust size here
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['text/csv'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else if (file?.size > 1024 * 1024 * 5) {
          // 1MB
          cb(
            new BadRequestException('Max File Size Reached. Max Allowed: 1MB'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadProductsCsv(@UploadedFile() file: Express.Multer.File) {
    try {
      const products: any = await this.productService.parseAndValidateCsvData(
        file,
      );
      return this.productService.uploadProductsCsv(products);
    } catch (e) {
      throw new ForbiddenException({ message: 'File not accepted!' });
    }
  }
}
