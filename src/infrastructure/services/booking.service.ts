import { CreateBookingCredentialsDto } from "@/application/dto/booking.dto";
import { IBookingService } from "@/application/services/booking.interface";
import { BookingRepository } from "../repositories/booking.repository";
import { PaymentStatus } from "@/shared/enum/payment-status.enum";
import { BookingDetailApiResponse, BookingDetailApiResponseList, BookingDetailistApiResponse, BookinglApiResponse, BookinglApiResponseList, BookingListApiResponse } from "@/application/response/booking.response";
import { PaginationParams } from "@/shared/types";
import { BookingDetailPaginationParams } from "@/domain/entities/booking_detail.entity";

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

  async findallWithPagination(query: PaginationParams): Promise<BookingListApiResponse> {
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
}

export const bookingService = new BookingServiceImpl();
