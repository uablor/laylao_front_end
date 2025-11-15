import {
  CreateUserCredentialsDto,
  ResetPasswordCredentialsDto,
  UpdateUserCredentialsDto,
} from "@/application/dto/user.dto";
import {
  UserApiResponse,
  UserApiResponseList,
  UserListApiResponse,
} from "@/application/response/user.response";
import { PaginationParams } from "@/shared/types";

export interface IUserRepository {
  create(credentials: CreateUserCredentialsDto): Promise<UserApiResponse>;
  update(id: number,credentials: UpdateUserCredentialsDto): Promise<UserApiResponse>;
  delete(id: number): Promise<UserApiResponse>;
  findAll(query: PaginationParams): Promise<UserApiResponseList>;
  findAllWithPagination(query: PaginationParams): Promise<UserListApiResponse>; // paginated
  findOne(id: number): Promise<UserApiResponse>;
  changePassword(id: number, credentials: ResetPasswordCredentialsDto): Promise<UserApiResponse>;
}
