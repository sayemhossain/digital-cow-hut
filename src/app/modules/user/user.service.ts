import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser, IUsersFilters } from './user.interface';
import { User } from './user.model';

export const createUserToDB = async (userData: IUser): Promise<IUser> => {
  const result = User.create(userData);
  return result;
};
export const getAllUserToDB = async (
  paginationFields: IPaginationOptions,
  filters: IUsersFilters
) => {
    
};
