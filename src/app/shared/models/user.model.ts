export interface UserModel {
  id: number;
  email: string;
  password?: string;
  name: string;
  world: string;
  admin: boolean;
}
