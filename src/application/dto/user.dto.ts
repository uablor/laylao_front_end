import { User, User_Password } from "@/domain/entities/user.entity";

export interface CreateUserCredentialsDto
  extends Omit<User_Password, "id"> {}

export interface UpdateUserCredentialsDto
  extends Omit<User_Password, "id" | "password"> {}

export interface DeleteUserCredentialsDto extends Pick<User, "id"> {}
export interface ResetPasswordCredentialsDto
  extends Pick<User_Password, "password"> {}

export interface GetUserCredentialsDto extends Pick<User, "id"> {}
