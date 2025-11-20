// src/application/repositories/room.repository.ts
import { IRoomRepository } from "@/domain/repositories/room.interface";
import { ApiClient } from "../apis/api";
import {
  CreateRoomCredentialsDto,
  UpdateRoomCredentialsDto,
} from "@/application/dto/room.dto";
import {
  RoomApiResponse,
  RoomApiResponseList,
  RoomListApiResponse,
} from "@/application/response/room.response";
import { API_ENDPOINTS } from "@/shared/constants";
import { Room } from "@/domain/entities/room.entity";
import { PaginationParams } from "@/shared/types";
import { get_endpoint_path } from "@/shared/utils/get-endpoint-path";

export class RoomRepositoryImpl implements IRoomRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(
    credentials: CreateRoomCredentialsDto
  ): Promise<RoomApiResponse> {
    const response = await this.apiClient.post<Room>(
      API_ENDPOINTS.ROOM.BASE,
      credentials
    );
    return response;
  }

  async update(
    credentials: UpdateRoomCredentialsDto
  ): Promise<RoomApiResponse> {
    const response = await this.apiClient.putOrPatch<Room>(
      get_endpoint_path(API_ENDPOINTS.ROOM.BASE, credentials.id),
      credentials,
      "PATCH"
    );
    return response;
  }

  async delete(id: number): Promise<RoomApiResponse> {
    const response = await this.apiClient.delete<Room>(
      get_endpoint_path(API_ENDPOINTS.ROOM.BASE, id)
    );
    return response;
  }

  async findallWithPagination(
    query: PaginationParams
  ): Promise<RoomListApiResponse> {
    const response = await this.apiClient.getPaginated<Room>(
      API_ENDPOINTS.ROOM.PAGINATION,
      query
    );
    return response;
  }
  async findall(): Promise<RoomApiResponseList> {
    const response = await this.apiClient.get<Room[]>(API_ENDPOINTS.ROOM.BASE);
    return response;
  }

  async findOne(id: number): Promise<RoomApiResponse> {
    const response = await this.apiClient.get<Room>(
      `${API_ENDPOINTS.ROOM.BASE}/${id}`
    );
    return response;
  }

  async updateStatus(id: number, status: string): Promise<RoomApiResponse> {
    const response = await this.apiClient.putOrPatch<Room>(
      get_endpoint_path(API_ENDPOINTS.ROOM.STATUS, id),
      { status: status },
      "PATCH"
    );
    return response;
  }

}

export const RoomRepository = new RoomRepositoryImpl();
