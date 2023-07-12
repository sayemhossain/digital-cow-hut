import { IUser } from './user.interface';
import { User } from './user.model';

export const createUserToDB = async (userData: IUser): Promise<IUser> => {
  const result = User.create(userData);
  return result;
};
