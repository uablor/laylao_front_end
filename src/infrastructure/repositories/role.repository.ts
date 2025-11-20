


import { ApiClient } from "../apis/api";
import { API_ENDPOINTS } from "@/shared/constants";
import {  PaginationParams } from "@/shared/types";
import { IRoleRepository } from "@/domain/repositories/role.interface";
import { RoleApiResponse, RoleApiResponseList, RoleListApiResponse } from "@/application/response/role.response";
import { Role } from "@/domain/entities/role.entity";

export class IRoleRepositoryImpl implements IRoleRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }
  async findAll(): Promise<RoleApiResponseList> {

    const response = await this.apiClient.get<Role[]>(
      API_ENDPOINTS.ROLE.BASE,
    );
    return response;
  }

  async findAllWithPagination(query: PaginationParams): Promise<RoleListApiResponse> {

    const response = await this.apiClient.getPaginated<Role>(
      API_ENDPOINTS.ROLE.PAGINATION,
      query
    );
    return response;
  }

  async findOne(id: number): Promise<RoleApiResponse> {
    const response = await this.apiClient.get<Role>(`${API_ENDPOINTS.ROLE.BASE}/${id}`);
    return response;
  }
}

export const RoleRepository = new IRoleRepositoryImpl();