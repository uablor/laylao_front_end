import {
  CreateBookingCredentialsDto,
} from "@/application/dto/booking.dto";
import {
  BookingDetailApiResponse,
  BookingDetailApiResponseList,
  BookingDetailistApiResponse,
  BookinglApiResponse,
  BookinglApiResponseList,
  BookingListApiResponse,
} from "@/application/response/booking.response";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { PaginationParams } from "@/shared/types";
import { BookingDetailPaginationParams } from "../entities/booking_detail.entity";

export interface IBookingRepository {
  create(credentials: CreateBookingCredentialsDto): Promise<void>;
  update_payment(status: PaymentStatus): Promise<BookinglApiResponse>;
  findall(): Promise<BookinglApiResponseList>;
  findallWithPagination(
    query: PaginationParams
  ): Promise<BookingListApiResponse>;
  findOne(id: number): Promise<BookinglApiResponse>;

  findalldetails(): Promise<BookingDetailApiResponseList>;
  findallWithPaginationdetails(
    query: BookingDetailPaginationParams
  ): Promise<BookingDetailistApiResponse>;
  findOnedetails(id: number): Promise<BookingDetailApiResponse>;
}
