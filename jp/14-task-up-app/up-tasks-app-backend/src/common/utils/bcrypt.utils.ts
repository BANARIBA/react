import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptUtils {
  public static hashParam = (param: string): string => {
    const salt = genSaltSync(10);
    return hashSync(param, salt);
  };

  public static compareHash = (param: string, hashedParam: string): boolean => {
    return compareSync(param, hashedParam);
  };
}
