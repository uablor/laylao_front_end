import { RoomType, RoomType_hotel_id } from "@/domain/entities/roomtype.entity";

export interface CreateRoomTypeCredentialsDto
  extends Omit<RoomType_hotel_id, "id" | "hotel" | "images" | "createdAt" | "updatedAt"> {}

export interface UpdateRoomTypeCredentialsDto extends Omit<RoomType_hotel_id, "hotel" | "images" | "createdAt" | "updatedAt"> {}

export interface DeleteRoomTypeCredentialsDto extends Pick<RoomType, "id"> {}

export interface GetRoomTypeCredentialsDto extends Pick<RoomType, "id"> {}
