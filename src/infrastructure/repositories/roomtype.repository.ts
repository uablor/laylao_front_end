// src/application/repositories/roomType.repository.t
import { IRoomTypeRepository } from "@/domain/repositories/roomtype.interface";
import { ApiClient } from "../apis/api";
import { API_ENDPOINTS } from "@/shared/constants";
// import {
//   CreateRoomTypeCredentialsDto,
//   UpdateRoomTypeCredentialsDto,
// } from "@/application/dto/roomtype.dto";
import {
  RoomTypeApiResponse,
  RoomTypeApiResponselist,
  RoomTypeListApiResponse,
} from "@/application/response/roomtype.response";
import {
  RoomType,
  RoomTypePaginationParams,
} from "@/domain/entities/roomtype.entity";
import { get_endpoint_path } from "@/shared/utils/get-endpoint-path";

export class RoomTypeRepositoryImpl implements IRoomTypeRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(credentials: FormData): Promise<RoomTypeApiResponse> {
    const response =
      await this.apiClient.PostOrPutOrPatch_MultipartFormData<RoomType>(
        API_ENDPOINTS.ROOM_TYPE.BASE,
        credentials
      );
    return response;
  }

  async update(
    id: number,
    credentials: FormData
  ): Promise<RoomTypeApiResponse> {
    const response =
      await this.apiClient.PostOrPutOrPatch_MultipartFormData<RoomType>(
        get_endpoint_path(API_ENDPOINTS.ROOM_TYPE.BASE, id),
        credentials,
        "PATCH"
      );
    return response;
  }

  async delete(id: number): Promise<RoomTypeApiResponse> {
    const response = await this.apiClient.delete<RoomType>(
      get_endpoint_path(API_ENDPOINTS.ROOM_TYPE.BASE, id)
    );
    return response;
  }

  async findall(id?: number): Promise<RoomTypeApiResponselist> {
    const response = await this.apiClient.get_params<RoomType[]>(
      API_ENDPOINTS.ROOM_TYPE.BASE,
      { id: id }
    );
    return response;
  }
  async findallWithPagination(
    query: RoomTypePaginationParams
  ): Promise<RoomTypeListApiResponse> {
    const response = await this.apiClient.getPaginated<RoomType>(
      API_ENDPOINTS.ROOM_TYPE.PAGINATION,
      query
    );
    return response;
  }

  async findOne(id: number): Promise<RoomTypeApiResponse> {
    const response = await this.apiClient.get<RoomType>(
      `${API_ENDPOINTS.ROOM_TYPE.BASE}/${id}`
    );
    return response;
  }
}

export const RoomTypeRepository = new RoomTypeRepositoryImpl();
