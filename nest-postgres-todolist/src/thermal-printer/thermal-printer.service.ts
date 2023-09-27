import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Printer type: 'star' or 'epson'
  interface: 'tcp://192.168.43.12:9100', // Printer interface
});

@Injectable()
export class ThermalPrinterService {
  async print(text: string) {
    const isConnected = await printer.isPrinterConnected(); // Check if printer is connected, return bool of status
    if (isConnected) {
      printer.print(text);

      return await printer.execute();
    } else {
      throw new InternalServerErrorException({
        message: 'Printer not connected',
      });
    }
  }
}
