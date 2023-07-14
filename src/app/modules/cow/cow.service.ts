import { ICow } from './cow.interface';

export const createCowToDB = async (paylod: ICow) => {
  const result = paylod.seller;
  console.log(result);
  //   const result = Cow.create(paylod);
  return result;
};
