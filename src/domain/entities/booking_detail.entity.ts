import { BaseEntity,  PaginationParams } from "@/shared/types";
import { type Dayjs } from "dayjs";
import { Booking } from "./booking.entity";
import { Room } from "./room.entity";


export interface BookingDetail {
  room_id: number;
  qty: number;
  checkin_date?: Dayjs | undefined;
  checkout_date?: Dayjs | undefined;
  total?: number
}

export interface IBookingDetail extends BaseEntity {
  id?: string;
  booking: Booking;
  room: Room;
  brokerage_fees: number;
  price: number;
  qty: number;
  total: number;
  checkin_date?: Date | null;
  checkout_date?: Date | null;}

export interface BookingDetailPaginationParams extends PaginationParams {
  booking_id?: number
}