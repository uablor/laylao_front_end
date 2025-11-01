import { RoomType } from "@/domain/entities/roomtype.entity";


export interface CreateRoomTypeCredentialsDto extends Omit<RoomType, "id"> {}

export interface UpdateRoomTypeCredentialsDto extends RoomType{}


export interface DeleteRoomTypeCredentialsDto extends Pick<RoomType, "id"> {}


export interface GetRoomTypeCredentialsDto extends Pick<RoomType, "id"> {}

