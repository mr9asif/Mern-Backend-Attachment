export interface ICreateUserInput {
  name: string;
  email: string;
}

export interface IUpdateUserInput {
  name?: string;
  email?: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
