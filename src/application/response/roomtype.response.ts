
import { RoomType } from "@/domain/entities/roomtype.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

// Response สำหรับ RoomType เดียว
export interface RoomTypeApiResponse extends ApiResponse<RoomType> {}
export interface RoomTypeApiResponselist extends ApiResponse<RoomType[]> {}

// Response สำหรับรายการ RoomType พร้อม pagination
export interface RoomTypeListApiResponse extends PaginatedResponse<RoomType> {}
