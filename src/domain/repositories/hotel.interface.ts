// src/domain/repositories/hotel.interface.ts
import {
  CreateHotelCredentialsDto,
  // UpdateHotelCredentialsDto,
} from "@/application/dto/hotel.dto";
import {
  HotelApiResponse,
  HotelApiResponseList,
  HotelApiResponseSummary,
  HotelListApiResponse,
  // uploadLogo,
} from "@/application/response/hotel.response";
import { HotelPaginationParams } from "../entities/hotel.entity";

export interface IHotelRepository {
  create(credentials: CreateHotelCredentialsDto): Promise<HotelApiResponse>;
  update(
    id: number,
    credentials: FormData
  ): Promise<HotelApiResponse>;
  delete(id: number): Promise<HotelApiResponse>;
  findall(): Promise<HotelApiResponseList>;
  findallWithPagination(
    query: HotelPaginationParams
  ): Promise<HotelListApiResponse>;
  findOne(id: number): Promise<HotelApiResponse>;
  findOneHotelDetails(id: number): Promise<HotelApiResponseSummary>;
  // uploadLogo(urls: string): Promise<uploadLogo>;
}
