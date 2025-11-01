import { IBookingRepository } from "@/domain/repositories/booking.interface";
import { ApiClient } from "../apis/api";
import { CreateBookingCredentialsDto } from "@/application/dto/booking.dto";
import { Booking, IBooking } from "@/domain/entities/booking.entity";
import { API_ENDPOINTS } from "@/shared/constants";
import {
  BookingDetailApiResponse,
  BookingDetailApiResponseList,
  BookingDetailistApiResponse,
  BookinglApiResponse,
  BookinglApiResponseList,
  BookingListApiResponse,
} from "@/application/response/booking.response";
import { PaginationParams } from "@/shared/types";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { BookingDetailPaginationParams, IBookingDetail } from "@/domain/entities/booking_detail.entity";
export class IBookingRepositoryImpl implements IBookingRepository {
  private apiClient: ApiClient;
  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(credentials: CreateBookingCredentialsDto): Promise<void> {
    await this.apiClient.post<Booking>(API_ENDPOINTS.BOOKING.BOOKING_DETAILS.BASE, credentials);
    // return response;
  }
  async findall(): Promise<BookinglApiResponseList> {
    const response = await this.apiClient.get<IBooking[]>(
      API_ENDPOINTS.BOOKING.BASE
    );
    return response;
  }

  async findOne(id: number): Promise<BookinglApiResponse> {
    const response = await this.apiClient.get<IBooking>(
      `${API_ENDPOINTS.BOOKING.BASE}/${id}`
    );
    return response;
  }

  async findallWithPagination(
    query: PaginationParams
  ): Promise<BookingListApiResponse> {
    const response = await this.apiClient.getPaginated<IBooking>(
      API_ENDPOINTS.BOOKING.PAGINATION,
      query
    );
    return response;
  }

  async update_payment(status: PaymentStatus): Promise<BookinglApiResponse> {
    const response = await this.apiClient.putOrPatch<IBooking>(
      API_ENDPOINTS.BOOKING.BASE,
      status
    );
    return response;
  }

    async findalldetails(): Promise<BookingDetailApiResponseList> {
    const response = await this.apiClient.get<IBookingDetail[]>(
      API_ENDPOINTS.BOOKING.BOOKING_DETAILS.BASE
    );
    return response;
  }

  async findOnedetails(id: number): Promise<BookingDetailApiResponse> {
    const response = await this.apiClient.get<IBookingDetail>(
      `${API_ENDPOINTS.BOOKING.BOOKING_DETAILS.BASE}/${id}`
    );
    return response;
  }

  async findallWithPaginationdetails(
    query: BookingDetailPaginationParams
  ): Promise<BookingDetailistApiResponse> {
    const response = await this.apiClient.getPaginated<IBookingDetail>(
      API_ENDPOINTS.BOOKING.BOOKING_DETAILS.PAGINATION,
      query
    );
    return response;
  }
}

export const BookingRepository = new IBookingRepositoryImpl();
