import { Room, Room_ID } from "@/domain/entities/room.entity";

export interface CreateRoomCredentialsDto extends Omit<Room_ID, "id"> {}

export interface UpdateRoomCredentialsDto extends Omit<Room_ID, "hotel_id"> {}

export interface DeleteRoomCredentialsDto extends Pick<Room, "id"> {}

export interface GetRoomCredentialsDto extends Pick<Room, "id"> {}
