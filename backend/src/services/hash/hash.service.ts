import bcrypt from 'bcrypt';

class Hash {
  public async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  }

  public async verify(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}

export { Hash };
