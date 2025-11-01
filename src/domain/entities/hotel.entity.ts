import { BaseEntity, PaginationParams } from "../../shared/types/index";
import { Zone } from './zone.entity';
export interface Hotel extends BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  logo: string;
  address: string;
  tel: string;
  email_hotel: string;
  location: string;
  floor: number;
  zone: Zone
}
export interface Hotel_Password extends Omit<Hotel, 'zone'>{
  password: string
  zone_id : number
}


export interface HotelSummary {
  readonly name: string;
  readonly address: string;
  readonly location: string;
  readonly room_total: number;
  readonly room_free: number;
  readonly room_no_free: number;
}

export interface HotelPaginationParams extends PaginationParams {
  zone_id?: number
  floor?: number
}
