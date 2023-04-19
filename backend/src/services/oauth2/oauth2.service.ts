import { google as googleapis, Auth } from 'googleapis';

type Constructor = {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  refreshToken: string;
};

class Oauth2 {
  private _oauth2Client: Auth.OAuth2Client;

  public constructor(params: Constructor) {
    this._oauth2Client = new googleapis.auth.OAuth2(
      params.clientId,
      params.clientSecret,
      params.redirectUrl,
    );
    this._oauth2Client.setCredentials({
      refresh_token: params.refreshToken,
    });
  }

  public generateAuthUrl(): string {
    return this._oauth2Client.generateAuthUrl({
      scope: ['profile', 'email', 'openid'],
    });
  }

  public async getAccessToken(): Promise<string | null | undefined> {
    const { token } = await this._oauth2Client.getAccessToken();
    return token;
  }

  public async getIdToken(code: string): Promise<string | null | undefined> {
    const { tokens } = await this._oauth2Client.getToken(code);
    return tokens.id_token;
  }
}

export { Oauth2 };
