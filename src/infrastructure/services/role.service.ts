import { PaginationParams } from "@/shared/types";
import { RoleRepository } from "../repositories/role.repository";
import {
  RoleApiResponse,
  RoleApiResponseList,
  RoleListApiResponse,
} from "@/application/response/role.response";
import { IRoleService } from "@/application/services/role.interface";

export class RoleServiceImpl implements IRoleService {
  private RoleRepo = RoleRepository;
  async findAll(): Promise<RoleApiResponseList> {
    return this.RoleRepo.findAll();
  }
  async findAllWithPagination(
    query: PaginationParams
  ): Promise<RoleListApiResponse> {
    return this.RoleRepo.findAllWithPagination(query);
  }

  async findOne(id: number): Promise<RoleApiResponse> {
    return this.RoleRepo.findOne(id);
  }
}

export const RoleService = new RoleServiceImpl();
