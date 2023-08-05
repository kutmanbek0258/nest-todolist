import { Module } from '@nestjs/common';
import { ReceiptModule } from './receipt.module';

@Module({
  imports: [ReceiptModule],
})
export class DocumentModule {}
