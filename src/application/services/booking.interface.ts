// import { PaginationParams } from "@/shared/types";
import {
  CreateBookingCredentialsDto,
} from "../dto/booking.dto";
import {
  BookingDetailApiResponse,
  BookingDetailApiResponseList,
  BookingDetailistApiResponse,
  BookinglApiResponse,
  BookinglApiResponseList,
  BookingListApiResponse,
  BookingReportApiResponse,
} from "../response/booking.response";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { BookingDetailPaginationParams } from "@/domain/entities/booking_detail.entity";
// import { HotelPaginationParams } from "@/domain/entities/hotel.entity";
import { BookingPaginationParams } from "@/domain/entities/booking.entity";

export interface IBookingService {
  create(credentials: CreateBookingCredentialsDto): Promise<void>;
  update_payment(status: PaymentStatus): Promise<BookinglApiResponse>;
  findall(): Promise<BookinglApiResponseList>;
  findallWithPagination(
    query: BookingPaginationParams
  ): Promise<BookingListApiResponse>;
  findOne(id: number): Promise<BookinglApiResponse>;

  findalldetails(): Promise<BookingDetailApiResponseList>;
  findallWithPaginationdetails(
    query: BookingDetailPaginationParams
  ): Promise<BookingDetailistApiResponse>;
  findOnedetails(id: number): Promise<BookingDetailApiResponse>;
  bookingReport(start_date?: string, end_date?: string): Promise<BookingReportApiResponse>;
}
