import { Hotel, Hotel_Password } from "@/domain/entities/hotel.entity";

export interface CreateHotelCredentialsDto
  extends Omit<Hotel_Password, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateHotelCredentialsDto
  extends Omit<
    Hotel_Password,
    "createdAt" | "password" | "updatedAt" | "zone" | "room_types" | "images"
  > {}

export interface DeleteHotelCredentialsDto extends Pick<Hotel, "id"> {}

export interface GetHotelCredentialsDto extends Pick<Hotel, "id"> {}
