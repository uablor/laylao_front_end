import { CreateRoomTypeCredentialsDto, UpdateRoomTypeCredentialsDto } from "@/application/dto/roomtype.dto";
import { RoomTypeApiResponse, RoomTypeApiResponselist, RoomTypeListApiResponse } from "@/application/response/roomtype.response";
import { PaginationParams } from "@/shared/types";

export interface IRoomTypeRepository {
  create(credentials: CreateRoomTypeCredentialsDto): Promise<RoomTypeApiResponse>;
  update(credentials: UpdateRoomTypeCredentialsDto): Promise<RoomTypeApiResponse>;
  delete(id: number): Promise<RoomTypeApiResponse>;
  findall(query: PaginationParams): Promise<RoomTypeApiResponselist>; // paginated
  findallWithPagination(query: PaginationParams): Promise<RoomTypeListApiResponse>; // paginated
  findOne(id: number): Promise<RoomTypeApiResponse>;
}
