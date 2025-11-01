import {
  RoleApiResponse,
  RoleApiResponseList,
  RoleListApiResponse,
} from "@/application/response/role.response";
import { PaginationParams } from "@/shared/types";

export interface IRoleRepository {
  findAll(query: PaginationParams): Promise<RoleApiResponseList>;
  findAllWithPagination(query: PaginationParams): Promise<RoleListApiResponse>;
  findOne(id: number): Promise<RoleApiResponse>;
}
