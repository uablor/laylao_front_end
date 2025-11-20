import { BookingReport, IBooking } from "@/domain/entities/booking.entity";
import { IBookingDetail } from "@/domain/entities/booking_detail.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";
// Booking
export interface BookinglApiResponse extends ApiResponse<IBooking> {}
export interface BookinglApiResponseList extends ApiResponse<IBooking[]> {}
export interface BookingListApiResponse extends PaginatedResponse<IBooking> {}
export interface BookingReportApiResponse extends ApiResponse<BookingReport> {}

// BookingDetail
export interface BookingDetailApiResponse extends ApiResponse<IBookingDetail> {}
export interface BookingDetailApiResponseList extends ApiResponse<IBookingDetail[]> {}
export interface BookingDetailistApiResponse extends PaginatedResponse<IBookingDetail> {}