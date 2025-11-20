
// import { CreateRoomTypeCredentialsDto, UpdateRoomTypeCredentialsDto } from "../dto/roomtype.dto";
import { RoomTypeApiResponse, RoomTypeApiResponselist, RoomTypeListApiResponse } from "../response/roomtype.response";
import { RoomTypePaginationParams } from "@/domain/entities/roomtype.entity";

export interface IRoomTypeService {
  create(credentials: FormData): Promise<RoomTypeApiResponse>;
  update(id : number,credentials: FormData): Promise<RoomTypeApiResponse>;
  delete(id: number): Promise<RoomTypeApiResponse>;
  findall(id: number): Promise<RoomTypeApiResponselist>; // paginated
  findallWithPagination(query: RoomTypePaginationParams): Promise<RoomTypeListApiResponse>; // paginated
  findOne(id: number): Promise<RoomTypeApiResponse>;
}
