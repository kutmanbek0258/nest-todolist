import { Module } from '@nestjs/common';
import { ReceiptModule } from './receipt/receipt.module';
import { WriteOffModule } from './write-off/write-off.module';

@Module({
  imports: [ReceiptModule, WriteOffModule],
})
export class DocumentModule {}
