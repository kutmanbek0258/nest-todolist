import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

const printer = new ThermalPrinter({
  type: PrinterTypes.DARUMA, // Printer type: 'star' or 'epson'
  interface: '/dev/usb/lp0', // Printer interface
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
