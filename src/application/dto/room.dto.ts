import { Room, Room_ID } from "@/domain/entities/room.entity";

export interface CreateRoomCredentialsDto extends Omit<Room_ID, "id"> {}

export interface UpdateRoomCredentialsDto extends Room_ID {}

export interface DeleteRoomCredentialsDto extends Pick<Room, "id"> {}

export interface GetRoomCredentialsDto extends Pick<Room, "id"> {}
