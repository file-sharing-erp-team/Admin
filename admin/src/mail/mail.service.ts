import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // use SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  async sendActivationMail(email: string, userLink: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Активация аккаунта Экосистема ИАТЭ",
        text: "",
        html: `
                <div>
                    <h1>Для активации перейдите по ссылке </h1>
                    <a href="${userLink}">${userLink}</a>
                </div>
                `
      });
    } catch (e) {
      throw new HttpException(
        `Сообщение не отправлено. Ошибка: ${e.message()}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
