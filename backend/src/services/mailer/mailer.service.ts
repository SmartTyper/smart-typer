import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { oauth2 as oauth2Service } from 'services/services';

type Constructor = {
  oauth2Service: typeof oauth2Service;
  user: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

class Mailer {
  private _oauth2Service: typeof oauth2Service;
  private _user: string;
  private _clientId: string;
  private _clientSecret: string;
  private _refreshToken: string;
  private _nodemailer: typeof nodemailer;

  public constructor(params: Constructor) {
    this._oauth2Service = params.oauth2Service;
    this._user = params.user;
    this._clientId = params.clientId;
    this._clientSecret = params.clientSecret;
    this._refreshToken = params.refreshToken;
    this._nodemailer = nodemailer;
  }

  private async _createTransport(): Promise<nodemailer.Transporter> {
    const accessToken = await this._oauth2Service.getAccessToken();
    return this._nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        clientId: this._clientId,
        clientSecret: this._clientSecret,
        user: this._user,
        refreshToken: this._refreshToken,
        accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as SMTPTransport.Options);
  }

  public async sendMail(
    options: Pick<
      Mail.Options,
      'to' | 'bcc' | 'text' | 'subject' | 'attachments'
    >,
  ): Promise<void> {
    const transporter = await this._createTransport();
    await transporter.sendMail({
      ...options,
      from: 'Smart Typer App ⌨️ <smart.typer.app@gmail.com>',
    });
  }
}

export { Mailer };
