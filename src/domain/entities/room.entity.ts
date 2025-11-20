import { RoomStatus } from "@/shared/enum/status-room.enum";
import { Hotel } from "./hotel.entity";
import { RoomType } from "./roomtype.entity";
import { BaseEntity, PaginationParams } from "@/shared/types";

export interface Room extends BaseEntity {
  id: number;
  room_number: string;
  name: string;
  price: number;
  brokerage_fees: number;
  floor: number;
  description: string;
  room_amenities: string;
  status: RoomStatus;
  room_type: RoomType;
  hotel: Hotel;
}

export interface Room_ID
  extends Omit<Room, "room_type" | "hotel" | "createdAt" | "updatedAt" | "status"> {
  room_type_id: number | string;
  hotel_id: number;
}

export interface RoomPaginationParams extends PaginationParams {
  hotel_id?: number;
  status?: RoomStatus | "all";
  room_type_id?: number;
  min_price?: number;
  max_price?: number;
}
