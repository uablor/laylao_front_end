import { BaseEntity, PaginationParams } from "@/shared/types";
import { BookingDetail, IBookingDetail } from "./booking_detail.entity";
import { User } from "./user.entity";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";

export interface Booking {
  customer_name: string;
  customer_tel: string;
  rooms: BookingDetail[];
}

export interface IBooking extends BaseEntity {
  id?: string;
  customer_name?: string;
  booking_code?: string;
  customer_tel?: string;
  created_by?: User | null;
  updated_by?: User | null;
  booking_date: Date;
  payment_status: PaymentStatus;
  details?: IBookingDetail[];
}

export interface BookingReport {
  total_booking: number;
  total_price: number;
  total_brokerage_fees: number;
  total_total: number;
}

export interface BookingPaginationParams extends PaginationParams {
  hotel_id?: string;
  start_date?:string ;
  end_date?:string;
}
