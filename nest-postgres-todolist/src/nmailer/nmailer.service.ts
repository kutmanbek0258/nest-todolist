import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class NmailerService {
  private logger = new Logger('EMAIL');

  constructor(private readonly mailerService: MailerService) {}

  public sendMail(email: string, uuid: string): void {
    this.mailerService
      .sendMail({
        to: email,
        from: 'smanovkutman0258@gmail.com',
        subject: 'Nestjs nodemailer service test',
        text: uuid,
        html: `<h3>one-time verification code</h3>
                <h2>${uuid}</h2>`,
      })
      .then((success) => {
        this.logger.log(`\n---------------------!!---------------------
                ${JSON.stringify(
                  success,
                )}\n---------------------!!---------------------`);
      })
      .catch((error) => {
        this.logger.error(`\n---------------------!!---------------------
                ${JSON.stringify(
                  error,
                )}\n---------------------!!---------------------`);
        throw new InternalServerErrorException('Error send mail');
      });
  }
}
