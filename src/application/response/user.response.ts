import { User } from "@/domain/entities/user.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface UserApiResponse extends ApiResponse<User> {}
export interface UserApiResponseList extends ApiResponse<User[]> {}

export interface UserListApiResponse extends PaginatedResponse<User> {}

export interface authme extends User {}
