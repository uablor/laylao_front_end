import { RoomSearchDto } from "../dto/room_search.dto";
import { RoomSearchApiResponseLise } from "../response/room_search.response";

export interface IRoomSearchService {
  findSearch(data:RoomSearchDto): Promise<RoomSearchApiResponseLise>; // paginated

}
