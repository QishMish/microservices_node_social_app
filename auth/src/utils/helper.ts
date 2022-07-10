import bcrypt from "bcrypt";
import crypto from "crypto";

export class Helper {
  static exclude<T, Key extends keyof T>(
    object: T,
    ...keys: Key[]
  ): Omit<T, Key> {
    for (let key of keys) {
      delete object[key];
    }
    return object;
  }
  static hashPassword = async (password: string, saltRound: number = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  static comparePassword = async (password: string, encryptedPass: string) => {
    return await bcrypt.compare(password, encryptedPass);
  };
  static hash = async (value: string, saltRound: number = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
  };
  static compareHash = async (value: string, encryptedValue: string) => {
    return await bcrypt.compare(value, encryptedValue);
  };
  static generateRandomString = () => {
    return crypto.randomBytes(32).toString("hex");
  };
  static hashRandomString = (value: string) => {
    return crypto.createHash("sha256").update(value).digest("hex");
  };
}

export default new Helper();
