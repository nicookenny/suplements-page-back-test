export interface IUser {
  name: string;
  email: string;
  password: string;
  code?: string;
  verified?: boolean;
}
