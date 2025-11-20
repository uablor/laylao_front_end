import { RoomSearchDto } from "@/application/dto/room_search.dto";
import { RoomSearchApiResponseLise } from "@/application/response/room_search.response";


export interface IRoomSearchRepository {
  findSearch(data:RoomSearchDto): Promise<RoomSearchApiResponseLise>; // paginated

}