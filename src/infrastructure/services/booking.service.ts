import { CreateBookingCredentialsDto } from "@/application/dto/booking.dto";
import { IBookingService } from "@/application/services/booking.interface";
import { BookingRepository } from "../repositories/booking.repository";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { BookingDetailApiResponse, BookingDetailApiResponseList, BookingDetailistApiResponse, BookinglApiResponse, BookinglApiResponseList, BookingListApiResponse, BookingReportApiResponse } from "@/application/response/booking.response";
// import { PaginationParams } from "@/shared/types";
import { BookingDetailPaginationParams } from "@/domain/entities/booking_detail.entity";
// import { HotelPaginationParams } from "@/domain/entities/hotel.entity";
import { BookingPaginationParams } from "@/domain/entities/booking.entity";

export class BookingServiceImpl implements IBookingService {
  private readonly repository = BookingRepository;

  async create(credentials: CreateBookingCredentialsDto): Promise<void> {
    await this.repository.create(credentials);
  }

  async update_payment(status: PaymentStatus): Promise<BookinglApiResponse> {
    return this.repository.update_payment(status);
  } 

  async findall(): Promise<BookinglApiResponseList> {
    return this.repository.findall();
  }

  async findallWithPagination(query: BookingPaginationParams): Promise<BookingListApiResponse> {
    return this.repository.findallWithPagination(query);
  }

  async findOne(id: number): Promise<BookinglApiResponse> {
    return this.repository.findOne(id);
  }

      async findalldetails(): Promise<BookingDetailApiResponseList> {
      const response = await this.repository.findalldetails();
      return response;
    }
  
    async findOnedetails(id: number): Promise<BookingDetailApiResponse> {
      const response = await this.repository.findOnedetails(id);
      return response;
    }
  
    async findallWithPaginationdetails(
      query: BookingDetailPaginationParams
    ): Promise<BookingDetailistApiResponse> {
      const response = await this.repository.findallWithPaginationdetails(query);
      return response;
    }

    async bookingReport(start_date?: string, end_date?: string): Promise<BookingReportApiResponse> {
      return this.repository.bookingReport(start_date, end_date);
    }
}

export const bookingService = new BookingServiceImpl();
