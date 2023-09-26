export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  img: string;
  role: string;
}
export interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  img?: string;
}


