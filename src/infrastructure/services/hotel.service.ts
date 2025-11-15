import { IHotelService } from "@/application/services/hotel.interface";
import { HotelRepository } from "../repositories/hotel.repository";
// import {
//   CreateHotelCredentialsDto,
//   UpdateHotelCredentialsDto,
// } from "@/application/dto/hotel.dto";
import {
  HotelApiResponse,
  HotelApiResponseList,
  HotelApiResponseSummary,
  HotelListApiResponse,
} from "@/application/response/hotel.response";
import { HotelPaginationParams } from "@/domain/entities/hotel.entity";

export class HotelServiceImpl implements IHotelService {
  private hotelRepo = HotelRepository;

  async create(credentials: any): Promise<HotelApiResponse> {
    return this.hotelRepo.create(credentials);
  }

  async update(id: number, credentials: FormData): Promise<HotelApiResponse> {
    return this.hotelRepo.update(id, credentials);
  }

  async delete(id: number): Promise<HotelApiResponse> {
    return this.hotelRepo.delete(id);
  }

  async findall(): Promise<HotelApiResponseList> {
    return this.hotelRepo.findall();
  }
  async findallWithPagination(
    query: HotelPaginationParams
  ): Promise<HotelListApiResponse> {
    return this.hotelRepo.findallWithPagination(query);
  }

  async findOne(id: number): Promise<HotelApiResponse> {
    return this.hotelRepo.findOne(id);
  }
  async findOneHotelDetails(id?: number): Promise<HotelApiResponseSummary> {
    return this.hotelRepo.findOneHotelDetails(id);
  }
  
}

export const HotelService = new HotelServiceImpl();
