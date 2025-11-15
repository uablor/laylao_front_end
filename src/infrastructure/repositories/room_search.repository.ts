import { IRoomSearchRepository } from "@/domain/repositories/room_search.interface";
import { ApiClient } from "../apis/api";
import { RoomSearchApiResponseLise } from "@/application/response/room_search.response";
import { RoomSearchDto } from "@/application/dto/room_search.dto";
import { RoomSearch } from "@/domain/entities/room_search.entity";
import { API_ENDPOINTS } from "@/shared/constants";

export class IRoomSearchRepositoryImpl implements IRoomSearchRepository {
  private apiClient: ApiClient;
  constructor() {
    this.apiClient = new ApiClient();
  }

  async findSearch(data: RoomSearchDto): Promise<RoomSearchApiResponseLise> {
    const response = await this.apiClient.post<RoomSearch[]>(
      API_ENDPOINTS.SEARCH.ALL,
      data
    );
    return response;
  }
}
export const RoomSearchRepository = new IRoomSearchRepositoryImpl();



