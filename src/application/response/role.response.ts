
import { ApiResponse, PaginatedResponse } from "@/shared/types";
import { Role } from '../../domain/entities/role.entity';

export interface RoleApiResponse extends ApiResponse<Role> {}
export interface RoleApiResponseList extends ApiResponse<Role[]> {}

export interface RoleListApiResponse extends PaginatedResponse<Role> {}
