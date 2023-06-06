import jwt from 'jsonwebtoken';
import { refreshToken as refreshTokenRepository } from 'data/repositories/repositories';
import {
  CommonKey,
  HttpCode,
  HttpErrorMessage,
  tokenExpirationTime,
} from 'common/enums/enums';
import {
  RefreshTokenRequestDto,
  TokensResponseDto,
  UserDto,
  UserIdDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';

type Constructor = {
  refreshTokenRepository: typeof refreshTokenRepository;
  secretKey: string;
};

class Token {
  private _refreshTokenRepository: typeof refreshTokenRepository;
  private _jwt: typeof jwt;
  private _secretKey: string;

  public constructor(params: Constructor) {
    this._refreshTokenRepository = params.refreshTokenRepository;
    this._jwt = jwt;
    this._secretKey = params.secretKey;
  }

  private _generateToken(
    userId: UserDto[CommonKey.ID],
    expiresIn: tokenExpirationTime,
  ): string {
    return this._jwt.sign({ userId }, this._secretKey, { expiresIn });
  }

  public verifyToken(token: string): UserIdDto {
    return jwt.verify(token, this._secretKey) as UserIdDto;
  }

  public decodeToken(token: string): Record<string, unknown> {
    return jwt.decode(token, { json: true }) as Record<string, unknown>;
  }

  public generateTokens(userId: UserDto[CommonKey.ID]): TokensResponseDto {
    return {
      accessToken: this._generateToken(
        userId,
        tokenExpirationTime.ACCESS_TOKEN,
      ),
      refreshToken: this._generateToken(
        userId,
        tokenExpirationTime.REFRESH_TOKEN,
      ),
    };
  }

  public async getTokens(
    userId: UserDto[CommonKey.ID],
  ): Promise<TokensResponseDto> {
    const tokens = this.generateTokens(userId);
    await this._refreshTokenRepository.upsert({
      userId,
      token: tokens.refreshToken,
    });
    return tokens;
  }

  public async refreshTokens(
    body: RefreshTokenRequestDto,
  ): Promise<TokensResponseDto> {
    try {
      const { refreshToken } = body;
      this.verifyToken(refreshToken);
      const userRefreshToken = await this._refreshTokenRepository.getByToken(
        body.refreshToken,
      );
      if (!userRefreshToken) {
        throw new Error();
      }
      const tokens = await this.getTokens(userRefreshToken.userId);
      return tokens;
    } catch {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: HttpErrorMessage.UNAUTHORIZED,
      });
    }
  }

  public async getUserIdByToken(
    token: string,
  ): Promise<UserDto[CommonKey.ID] | undefined> {
    const record = await this._refreshTokenRepository.getByToken(token);
    if (!record) return;
    return record.userId;
  }

  public async removeRefreshToken(
    userId: UserDto[CommonKey.ID],
  ): Promise<void> {
    await this._refreshTokenRepository.removeByUserId(userId);
  }
}

export { Token };
