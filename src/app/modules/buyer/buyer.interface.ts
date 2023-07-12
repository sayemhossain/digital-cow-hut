export type IName = {
  firstName: string;
  lastName: string;
};
export type IBuyer = {
  name: IName;
  email: string;
  phoneNumber: string;
  address?: string;
  budget: number;
  income: number;
};
