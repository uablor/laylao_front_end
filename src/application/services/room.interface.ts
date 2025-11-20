import { PaginationParams } from "@/shared/types";
import { 
  CreateRoomCredentialsDto, 
  UpdateRoomCredentialsDto 
} from "../dto/room.dto";
import { 
  RoomApiResponse, 
  RoomApiResponseList, 
  RoomListApiResponse 
} from "../response/room.response";

export interface IRoomService {
  create(credentials: CreateRoomCredentialsDto): Promise<RoomApiResponse>;
  update(credentials: UpdateRoomCredentialsDto): Promise<RoomApiResponse>;
  delete(id: number): Promise<RoomApiResponse>;
  findall(): Promise<RoomApiResponseList>;
  findallWithPagination(query: PaginationParams): Promise<RoomListApiResponse>;
  findOne(id: number): Promise<RoomApiResponse>;
  updateStatus(id: number, status: string): Promise<RoomApiResponse>;
}
