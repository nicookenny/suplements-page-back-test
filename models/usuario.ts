export interface IUser {
  name: string;
  email: string;
  password: string;
  code?: string; //codigo para verificar
  verified?: boolean;
}
