export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  readed?: number[];
}
