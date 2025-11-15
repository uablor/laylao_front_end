import { BaseEntity, PaginationParams } from "@/shared/types";
import { Hotel } from "./hotel.entity";
import { Images } from "./image.entity";

export interface RoomType extends BaseEntity {
  id: number;
  name: string;
  hotel: Hotel | null;
  images?:Images[]
}

export interface RoomType_hotel_id extends Omit<RoomType, "hotel"> {
  hotel_id: number;
  image_ids: number[];
}

export interface RoomTypePaginationParams extends PaginationParams {
  hotel_id?: number;
}