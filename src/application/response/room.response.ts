import { Room } from "@/domain/entities/room.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface RoomApiResponse extends ApiResponse<Room> {}
export interface RoomApiResponseList extends ApiResponse<Room[]> {}

export interface RoomListApiResponse extends PaginatedResponse<Room> {}
