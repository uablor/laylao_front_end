import { PaginationParams } from "@/shared/types";
import { CreateRoomTypeCredentialsDto, UpdateRoomTypeCredentialsDto } from "../dto/roomtype.dto";
import { RoomTypeApiResponse, RoomTypeApiResponselist, RoomTypeListApiResponse } from "../response/roomtype.response";

export interface IRoomTypeService {
  create(credentials: CreateRoomTypeCredentialsDto): Promise<RoomTypeApiResponse>;
  update(credentials: UpdateRoomTypeCredentialsDto): Promise<RoomTypeApiResponse>;
  delete(id: number): Promise<RoomTypeApiResponse>;
  findall(query: PaginationParams): Promise<RoomTypeApiResponselist>; // paginated
  findallWithPagination(query: PaginationParams): Promise<RoomTypeListApiResponse>; // paginated
  findOne(id: number): Promise<RoomTypeApiResponse>;
}
