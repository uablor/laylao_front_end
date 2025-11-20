// src/application/repositories/zone.repository.ts
import { IZoneRepository } from "@/domain/repositories/zone.interface";
import { ApiClient } from "../apis/api";
import {
  ZoneApiResponse,
  ZoneApiResponseList,
  ZoneListApiResponse,
} from "@/application/response/zone.response";
import { API_ENDPOINTS } from "@/shared/constants";
import { Zone } from "@/domain/entities/zone.entity";
import { PaginationParams } from "@/shared/types";
import {
  CreateZoneCredentialsDto,
  UpdateZoneCredentialsDto,
} from "@/application/dto/zone.dto";
import { get_endpoint_path } from "@/shared/utils/get-endpoint-path";

export class ZoneRepositoryImpl implements IZoneRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(
    credentials: CreateZoneCredentialsDto
  ): Promise<ZoneApiResponse> {
    const response = await this.apiClient.post<Zone>(
      API_ENDPOINTS.ZONE.BASE,
      credentials
    );
    return response;
  }

  async update(
    credentials: UpdateZoneCredentialsDto
  ): Promise<ZoneApiResponse> {
    const response = await this.apiClient.putOrPatch<Zone>(
      get_endpoint_path(API_ENDPOINTS.ZONE.BASE, credentials.id),
      credentials,
      "PATCH"
    );
    return response;
  }

  async delete(id: number): Promise<ZoneApiResponse> {
    const response = await this.apiClient.delete<Zone>(
      get_endpoint_path(API_ENDPOINTS.ZONE.BASE, id)
    );
    return response;
  }

  async findall(): Promise<ZoneApiResponseList> {
    const response = await this.apiClient.get<Zone[]>(API_ENDPOINTS.ZONE.BASE);
    return response;
  }

  async findAllWithPagination(query: PaginationParams): Promise<ZoneListApiResponse> {
    const response = await this.apiClient.getPaginated<Zone>(
      API_ENDPOINTS.ZONE.PAGINATION,
      query
    );
    return response;
  }

  async findOne(id: number): Promise<ZoneApiResponse> {
    const response = await this.apiClient.get<Zone>(
      `${API_ENDPOINTS.ZONE.BASE}/${id}`
    );
    return response;
  }
}

export const ZoneRepository = new ZoneRepositoryImpl();
