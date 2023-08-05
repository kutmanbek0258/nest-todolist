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
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    private readonly supplierService: SupplierService,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
  ) {}
  async create(user: User, createReceiptDto: CreateReceiptDto) {
    const supplier: Supplier = await this.supplierService.findOneShort(
      createReceiptDto.supplierID,
    );
    const shop: Shop = await this.shopService.findOneShort(
      createReceiptDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      createReceiptDto.depotID,
    );
    if (supplier && shop && depot) {
      const receipt = this.receiptRepository.create({
        supplier,
        shop,
        depot,
        created_by: user,
      });
      return await this.receiptRepository.save(receipt);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.receiptRepository.count();
    const receipts = await this.receiptRepository.query(
      `SELECT receipt.id AS id, receipt."supplierId" AS supplierID, receipt."shopId" AS shopid, receipt."depotId" AS depotid,
                    p.full_name AS suppliername,
                    s.name AS shopname,
                    d.name AS depotname
                FROM receipt
                INNER JOIN supplier sr on sr.id = receipt."supplierId"
                INNER JOIN shop s on s.id = receipt."shopId"
                INNER JOIN depot d on d.id = receipt."depotId"
                INNER JOIN person p on p.id = sr."personId"
                LIMIT ${findAllDto.take} OFFSET ${findAllDto.skip}`,
    );
    return { total, receipts };
  }

  async findOne(id: number) {
    return await this.receiptRepository.query(
      `SELECT receipt.id AS id, receipt."supplierId" AS supplierID, receipt."shopId" AS shopid, receipt."depotId" AS depotid,
                    p.full_name AS suppliername,
                    s.name AS shopname,
                    d.name AS depotname
                FROM receipt
                INNER JOIN supplier sr on sr.id = receipt."supplierId"
                INNER JOIN shop s on s.id = receipt."shopId"
                INNER JOIN depot d on d.id = receipt."depotId"
                INNER JOIN person p on p.id = sr."personId"
                WHERE receipt.id = ${id}`,
    );
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const supplier: Supplier = await this.supplierService.findOneShort(
      updateReceiptDto.supplierID,
    );
    const shop: Shop = await this.shopService.findOneShort(
      updateReceiptDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      updateReceiptDto.depotID,
    );
    if (supplier && shop && depot) {
      return await this.receiptRepository.update(
        { id: id },
        {
          supplier,
          shop,
          depot,
        },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.receiptRepository.delete({ id: id });
  }
}
