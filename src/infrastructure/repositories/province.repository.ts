// src/application/repositories/province.repository.ts
import { IProvinceRepository } from "@/domain/repositories/province.interface";
import {
  ProvinceApiResponse,
  ProvinceListApiResponse,
} from "@/application/response/province.response";
import {
  CreateProvinceCredentialsDto,
  UpdateProvinceCredentialsDto,
} from "@/application/dto/province.dto";
import { ApiClient } from "../apis/api";
import { PaginationParams } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants";

export class ProvinceRepositoryImpl implements IProvinceRepository {
  private apiClient = new ApiClient();

  async create(
    credentials: CreateProvinceCredentialsDto
  ): Promise<ProvinceApiResponse> {
    return this.apiClient.post(API_ENDPOINTS.PROVINCE, credentials);
  }

  async update(
    credentials: UpdateProvinceCredentialsDto
  ): Promise<ProvinceApiResponse> {
    return this.apiClient.putOrPatch(
      API_ENDPOINTS.PROVINCE,
      credentials,
      "PATCH"
    );
  }

  async delete(id: number): Promise<ProvinceApiResponse> {
    return this.apiClient.delete(`${API_ENDPOINTS.PROVINCE}/${id}`);
  }

  async findall(_query: PaginationParams): Promise<ProvinceListApiResponse> {
    const mock: ProvinceListApiResponse = {
      data: [
        { id: 1, name: "Province 1", district: { id: 1, name: "District 1" } },
        { id: 2, name: "Province 2", district: { id: 2, name: "District 2" } },
      ],
      pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
    };
    return mock;
  }

  async findOne(id: number): Promise<ProvinceApiResponse> {
    return this.apiClient.get(`${API_ENDPOINTS.PROVINCE}/${id}`);
  }
}

export const ProvinceRepository = new ProvinceRepositoryImpl();
