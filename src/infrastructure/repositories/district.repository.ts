// src/application/repositories/district.repository.ts
import { ApiClient } from "../apis/api";
import {
  CreateDistrictCredentialsDto,
  UpdateDistrictCredentialsDto,
} from "@/application/dto/district.dto";
import {
  DistrictApiResponse,
  DistrictListApiResponse,
} from "@/application/response/district.response";
import { API_ENDPOINTS } from "@/shared/constants";
import { District } from "@/domain/entities/district.entity";
import { PaginationParams } from "@/shared/types";
import { IDistrictRepository } from "@/domain/repositories/district.interface";

export class DistrictRepositoryImpl implements IDistrictRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(
    credentials: CreateDistrictCredentialsDto
  ): Promise<DistrictApiResponse> {
    const response = await this.apiClient.post<District>(
      API_ENDPOINTS.DISTRICT,
      credentials
    );
    return response;
  }

  async update(
    credentials: UpdateDistrictCredentialsDto
  ): Promise<DistrictApiResponse> {
    const response = await this.apiClient.putOrPatch<District>(
      API_ENDPOINTS.DISTRICT,
      credentials,
      "PATCH"
    );
    return response;
  }

  async delete(id: number): Promise<DistrictApiResponse> {
    const response = await this.apiClient.delete<District>(
      `${API_ENDPOINTS.DISTRICT}/${id}`
    );
    return response;
  }

  async findall(
    _query: PaginationParams,
    provinceId?: string
  ): Promise<DistrictListApiResponse> {
    // สามารถใช้ API จริงแทน mock data
    const testDistrictList: DistrictListApiResponse = {
      data: [
        { id: 1, name: "District A" },
        { id: 2, name: "District B" },
        { id: 3, name: "District C" },
      ].filter((district) => district.id === Number(provinceId)),
      pagination: {
        page: 1,
        limit: 10,
        total: 3,
        totalPages: 1,
      },
    };
    return testDistrictList;
  }

  async findOne(id: number): Promise<DistrictApiResponse> {
    const response = await this.apiClient.get<District>(
      `${API_ENDPOINTS.DISTRICT}/${id}`
    );
    return response;
  }
}

export const DistrictRepository = new DistrictRepositoryImpl();
