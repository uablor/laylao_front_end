import { PaginationParams } from "@/shared/types";
import { RoleApiResponse, RoleApiResponseList, RoleListApiResponse } from "../response/role.response";

export interface IRoleService {
  findAll(query: PaginationParams): Promise<RoleApiResponseList>;
  findAllWithPagination(query: PaginationParams): Promise<RoleListApiResponse>;
  findOne(id: number): Promise<RoleApiResponse>;
}
