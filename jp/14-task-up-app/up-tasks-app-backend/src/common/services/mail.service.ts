import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions, SentMessageInfo } from '../interfaces/mail.interface';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'arielanariba0@gmail.com',
        pass: 'jqekearopfvmunah',
      },
      connectionTimeout: 10000, // 10 segundos
    });
  }

  // Verificar conexión
  public async testConnection() {
    try {
      await this.transporter.verify();
      console.log('Conexión al servidor de correo: OK');
    } catch (error) {
      console.error('Error de conexión al servidor de correo:', error);
    }
  }

  public async sendEmailData(
    mailOptions: MailOptions,
  ): Promise<SentMessageInfo> {
    return (await this.transporter.sendMail(mailOptions)) as SentMessageInfo;
  }
}
