// import { CreateBookingCredentialsDto } from "@/application/dto/booking.dto";
import {
  BookingDetailApiResponse,
  BookingDetailApiResponseList,
  BookingDetailistApiResponse,
  BookinglApiResponse,
  BookinglApiResponseList,
  BookingListApiResponse,
  BookingReportApiResponse,
} from "@/application/response/booking.response";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { BookingDetailPaginationParams } from "../entities/booking_detail.entity";
import { BookingPaginationParams } from "../entities/booking.entity";

export interface IBookingRepository {
  create(credentials: any): Promise<void>;
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
  bookingReport(
    start_date?: string,
    end_date?: string
  ): Promise<BookingReportApiResponse>;
}
