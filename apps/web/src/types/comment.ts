export interface IUser {
  id: string;
  name: string;
  avatar: string;
}

export interface IReply {
  id: string;
  user: IUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  id: string;
  isReply: boolean;
  user: IUser;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies?: IReply[];
}
