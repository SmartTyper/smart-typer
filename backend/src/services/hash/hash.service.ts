import bcrypt from 'bcrypt';

class Hash {
  private _bcrypt: typeof bcrypt;

  public constructor() {
    this._bcrypt = bcrypt;
  }

  public async hash(value: string): Promise<string> {
    const salt = await this._bcrypt.genSalt(10);
    return this._bcrypt.hash(value, salt);
  }

  public async verify(value: string, hash: string): Promise<boolean> {
    return this._bcrypt.compare(value, hash);
  }
}

export { Hash };
