import {
  CreateRoomCredentialsDto,
  UpdateRoomCredentialsDto,
} from "@/application/dto/room.dto";
import {
  RoomApiResponse,
  RoomApiResponseList,
  RoomListApiResponse,
} from "@/application/response/room.response";
import { PaginationParams } from "@/shared/types";

export interface IRoomRepository {
  create(credentials: CreateRoomCredentialsDto): Promise<RoomApiResponse>;
  update(credentials: UpdateRoomCredentialsDto): Promise<RoomApiResponse>;
  delete(id: number): Promise<RoomApiResponse>;
  findall(): Promise<RoomApiResponseList>;
  findallWithPagination(query: PaginationParams): Promise<RoomListApiResponse>;
  findOne(id: number): Promise<RoomApiResponse>;
  updateStatus(id: number, status: string): Promise<RoomApiResponse>;
}
