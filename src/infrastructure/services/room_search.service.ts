import { IRoomSearchService } from "@/application/services/room_search.interface";
import { RoomSearchRepository } from "../repositories/room_search.repository";
import { RoomSearchDto } from "@/application/dto/room_search.dto";
import { RoomSearchApiResponseLise } from "@/application/response/room_search.response";


export class RoomSearchServiceImpl implements IRoomSearchService {
  private readonly repository = RoomSearchRepository; 

  async findSearch(data: RoomSearchDto): Promise<RoomSearchApiResponseLise> {
    const response = await this.repository.findSearch(data);
    return response;
  }
}

export const RoomSearchService = new RoomSearchServiceImpl();