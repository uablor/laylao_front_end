import { BaseEntity, PaginationParams } from "../../shared/types/index";
import { Images } from "./image.entity";
import { RoomType } from "./roomtype.entity";
import { Zone } from "./zone.entity";
export interface Hotel extends BaseEntity {
  id: number;
  start_time: string;
  end_time: string;
  name: string;
  logo: Images;
  address: string;
  tel: string;
  email_hotel: string;
  floor: number;
  zone: Zone;
  room_types?: RoomType[];
  images?: Images[];
  latitude: number;
  longitude: number;
}
export interface Hotel_Password extends Omit<Hotel, "zone"> {
  password: string;
  logo_id: number | string  ;
  zone_id: number;
  image_ids: number[];
}

export interface HotelSummary {
  readonly name: string;
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly room_type_total: number;
  readonly booking_total: number;
  readonly room_total: number;
  readonly room_free: number;
  readonly room_no_free: number;
}

export interface HotelPaginationParams extends PaginationParams {
  zone_id?: number;
  floor?: number;
}
