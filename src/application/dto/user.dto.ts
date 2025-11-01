import { User } from "@/domain/entities/user.entity";

export interface CreateUserCredentialsDto
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {
    password: string
  }

export interface UpdateUserCredentialsDto extends Omit<User , "createdAt" | "updatedAt" | "password"> {}

export interface DeleteUserCredentialsDto extends Pick<User, "id"> {}

export interface GetUserCredentialsDto extends Pick<User, "id"> {}

