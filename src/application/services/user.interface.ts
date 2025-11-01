import { PaginationParams } from "@/shared/types";
import {
  CreateUserCredentialsDto,
  UpdateUserCredentialsDto,
} from "../dto/user.dto";
import {
  UserApiResponse,
  UserApiResponseList,
  UserListApiResponse,
} from "../response/user.response";

export interface IUserService {
  create(credentials: CreateUserCredentialsDto): Promise<UserApiResponse>;
  update(credentials: UpdateUserCredentialsDto): Promise<UserApiResponse>;
  delete(id: number): Promise<UserApiResponse>;
  findAll(query: PaginationParams): Promise<UserApiResponseList>;
  findAllWithPagination(query: PaginationParams): Promise<UserListApiResponse>;
  findOne(id: number): Promise<UserApiResponse>;
}
