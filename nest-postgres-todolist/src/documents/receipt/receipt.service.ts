import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { SupplierService } from '../../references/supplier/supplier.service';
import { ShopService } from '../../references/shop/shop.service';
import { DepotService } from '../../references/depot/depot.service';
import { Supplier } from '../../references/supplier/entities/supplier.entity';
import { Shop } from '../../references/shop/entities/shop.entity';
import { Depot } from '../../references/depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    private readonly supplierService: SupplierService,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
  ) {}
  async create(createReceiptDto: CreateReceiptDto) {
    const suppler: Supplier = await this.supplierService.findOneShort(
      createReceiptDto.supplierID,
    );
    const shop: Shop = await this.shopService.findOneShort(
      createReceiptDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      createReceiptDto.depotID,
    );
    if (suppler && shop && depot) {
      const receipt = this.receiptRepository.create({
        supplier: suppler,
        shop: shop,
        depot: depot,
      });
      return await this.receiptRepository.save(receipt);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(/*findAllDto: FindAllDto*/) {
    // const total = await this.receiptRepository.count();
    // const receipts = await this.receiptRepository.query(
    //   `SELECT receipt.id AS id, receipt."supplierId" AS supplierID, receipt."shopId" AS shopid, receipt."depotId" AS depotid,
    //                 person.full_name AS suppliername,
    //                 shop.name AS shopname,
    //                 depot.name AS depotname
    //             FROM receipt
    //             INNER JOIN supplier on supplier.id = receipt."supplierId"
    //             INNER JOIN shop on shop.id = receipt."shopId"
    //             INNER JOIN depot on depot.id = receipt."depotId"
    //             INNER JOIN person on person.id = supplier."personId"`,
    // );
    return `This action returns all receipt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
